import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://boucoogfrbkemeyhhcjz.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJvdWNvb2dmcmJrZW1leWhoY2p6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI1OTAwNjUsImV4cCI6MjA1ODE2NjA2NX0.V1cRtm0evm56XGT7WiPbJtmx48zuSpC4tPirHXKlXrQ";

export const supabase = createClient(supabaseUrl, supabaseKey);
