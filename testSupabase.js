import { supabase } from './services/supabase';

const testSupabaseConnection = async () => {
  console.log('🔎 Testing Supabase connection...');

  try {
    // Test fetching data from a known table
    const { data, error } = await supabase.from('questions').select('*');

    if (error) {
      console.error('❌ Error fetching data:', error.message);
      console.log('🔑 Supabase URL:', process.env.REACT_APP_SUPABASE_URL);
      console.log('🔑 Supabase Key:', process.env.REACT_APP_SUPABASE_KEY);
    } else {
      console.log('✅ Supabase connected successfully!');
      console.log('📊 Fetched data:', data);
    }
  } catch (err) {
    console.error('❌ Unexpected error:', err.message);
  }
};

export default testSupabaseConnection;
