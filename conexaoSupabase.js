import { createClient } from "@supabase/supabase-js";

const link = 'https://xmenyvttnpyigrgxicah.supabase.co'
const chave = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhtZW55dnR0bnB5aWdyZ3hpY2FoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg0MDc0OTksImV4cCI6MjAzMzk4MzQ5OX0.AsASGfRwz4TpmPgHdeFwVNNdgug_InoEYRytdaKjx9g'

export const supabase = createClient(link, chave)
