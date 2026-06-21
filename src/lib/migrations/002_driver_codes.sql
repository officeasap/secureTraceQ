-- Create driver_codes table
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

-- Insert sample data
INSERT INTO driver_codes (code, card_front_url, card_back_url, category, reference, departure, sorting_center) VALUES
('AU-Y0312J9', '/assets/card-front.png', '/assets/card-back.png', 'CLASSIC CATEGORIE', 'NT903147', 'Bole | Addis Ababa', 'Addis Ababa Sorting Center'),
('DRV-7829-KL', '/assets/card-front.png', '/assets/card-back.png', 'PREMIUM CATEGORIE', 'NT892341', 'Jomo | Nairobi', 'Nairobi Sorting Center');

-- Create tracking_updates table
CREATE TABLE tracking_updates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tracking_code TEXT NOT NULL,
  previous_status TEXT,
  new_status TEXT NOT NULL,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  triggered_by TEXT
);

-- Enable RLS policies (assuming RLS is enabled)
ALTER TABLE delivery_audit ENABLE ROW LEVEL SECURITY;
ALTER TABLE auth_audit ENABLE ROW LEVEL SECURITY;
ALTER TABLE ui_depth_audit ENABLE ROW LEVEL SECURITY;
ALTER TABLE owner_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE delivery_audit ADD POLICY audit_immutable_insert ON delivery_audit FOR INSERT TO authenticated USING (true);
ALTER TABLE delivery_audit ADD POLICY audit_no_update ON delivery_audit FOR UPDATE USING (false);
ALTER TABLE delivery_audit ADD POLICY audit_no_delete ON delivery_audit FOR DELETE USING (false);

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