import { supabase } from '../supabase';

export const trackingService = {
  async fetchTrackingData(trackingCode: string): Promise<{
    cardFrontUrl: string;
    cardBackUrl: string;
    category: string;
    reference: string;
    currentStatus: string;
    departure: string;
    sortingCenter: string;
  }> {
    // Get card data from driver_codes
    const { data: cardData, error: cardError } = await supabase
      .from('driver_codes')
      .select('card_front_url, card_back_url, category, reference, departure, sorting_center')
      .eq('code', trackingCode)
      .single();

    if (cardError) {
      throw new Error('Card data not found');
    }

    // Get current status from tracking_updates (latest)
    const { data: updates, error: updateError } = await supabase
      .from('tracking_updates')
      .select('new_status')
      .eq('tracking_code', trackingCode)
      .order('timestamp', { ascending: false })
      .limit(1)
      .single();

    const currentStatus = updates?.new_status ?? 'SORTING';

    return {
      cardFrontUrl: cardData.card_front_url,
      cardBackUrl: cardData.card_back_url,
      category: cardData.category,
      reference: cardData.reference,
      currentStatus,
      departure: cardData.departure,
      sortingCenter: cardData.sorting_center,
    };
  },

  async subscribeToTrackingUpdates(trackingCode: string, callback: (data: any) => void) {
    const channel = supabase
      .channel('tracking-channel')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'tracking_updates',
        filter: `tracking_code=eq.${trackingCode}`,
      }, payload => {
        if (payload.new) {
          callback(payload.new);
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  },
};