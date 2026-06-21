-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Delivery audit table
CREATE TABLE delivery_audit (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  driver_code_hash TEXT NOT NULL,
  stage TEXT NOT NULL CHECK (stage IN ('sorting', 'transit', 'destination', 'delivered')),
  status TEXT NOT NULL,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  owner_email TEXT,
  ip_address INET,
  user_agent TEXT,
  compliance_tags TEXT[] DEFAULT ARRAY['NAME-LAW-SECURETRACE'],
  previous_hash TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Auth audit table
CREATE TABLE auth_audit (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  driver_code_hash TEXT,
  success BOOLEAN,
  ip_address INET,
  attempt_count INT,
  locked_until TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- UI depth audit table
CREATE TABLE ui_depth_audit (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type TEXT NOT NULL,
  component_id TEXT NOT NULL,
  compliance_tag TEXT NOT NULL DEFAULT 'UI-LAW-CARD-DEPTH',
  shadow_css TEXT,
  user_agent TEXT,
  session_id UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Owner notifications table
CREATE TABLE owner_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  tracking_code TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'failed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  sent_at TIMESTAMPTZ
);

-- Driver codes table (new)
CREATE TABLE driver_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT UNIQUE NOT NULL,
  card_front_url TEXT NOT NULL,
  card_back_url TEXT NOT NULL,
  category TEXT NOT NULL,
  reference TEXT NOT NULL,
  departure TEXT NOT NULL,
  sorting_center TEXT NOT NULL,
  current_status TEXT DEFAULT 'SORTING',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tracking updates table (new)
CREATE TABLE tracking_updates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tracking_code TEXT NOT NULL,
  previous_status TEXT,
  new_status TEXT NOT NULL,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  triggered_by TEXT
);

-- RLS policies (immutable)
ALTER TABLE delivery_audit ENABLE ROW LEVEL SECURITY;
CREATE POLICY audit_immutable_insert ON delivery_audit FOR INSERT TO authenticated USING (true);
CREATE POLICY audit_no_update ON delivery_audit FOR UPDATE USING (false);
CREATE POLICY audit_no_delete ON delivery_audit FOR DELETE USING (false);

-- Naming compliance trigger
CREATE OR REPLACE FUNCTION enforce_naming_compliance() RETURNS TRIGGER AS $$
BEGIN
  IF NOT ('NAME-LAW-SECURETRACE' = ANY(NEW.compliance_tags)) THEN
    RAISE EXCEPTION 'NAME-LAW VIOLATION: Missing SecureTrace compliance tag';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER enforce_naming_compliance_trigger
BEFORE INSERT ON delivery_audit
FOR EACH ROW EXECUTE FUNCTION enforce_naming_compliance();

-- Rate limiting function
CREATE OR REPLACE FUNCTION check_rate_limit(p_ip INET, p_max_attempts INT DEFAULT 5, p_window_minutes INT DEFAULT 15) RETURNS BOOLEAN AS $$
DECLARE attempt_count INT;
BEGIN
  SELECT COUNT(*) INTO attempt_count
  FROM auth_audit
  WHERE ip_address = p_ip
    AND created_at > NOW() - (p_window_minutes || ' minutes')::INTERVAL
    AND success = false;
  RETURN attempt_count < p_max_attempts;
END;
$$ LANGUAGE plpgsql;