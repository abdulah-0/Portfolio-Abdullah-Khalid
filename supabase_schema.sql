-- Supabase SQL Schema for Abdullah Khalid Portfolio
-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard/project/_/sql)

-- 1. Create the projects table
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  tools TEXT NOT NULL,
  image TEXT NOT NULL,
  link TEXT,
  github_link TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- 3. Policy: Allow public read access to everyone
CREATE POLICY "Allow public read access"
  ON public.projects
  FOR SELECT
  USING (true);

-- 4. Policy: Allow insert/update/delete access
CREATE POLICY "Allow insert for all"
  ON public.projects
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow update for all"
  ON public.projects
  FOR UPDATE
  USING (true);

CREATE POLICY "Allow delete for all"
  ON public.projects
  FOR DELETE
  USING (true);

-- 5. Insert initial seed projects
INSERT INTO public.projects (title, category, description, tools, image, link, github_link)
VALUES
(
  'AI Interactive Portfolio',
  'Full Stack & 3D Web',
  'A high-performance interactive 3D portfolio website showcasing web applications, interactive WebGL character rendering, GSAP animations, and Supabase integration.',
  'React, TypeScript, Three.js, GSAP, Supabase',
  '/images/placeholder.webp',
  'https://github.com/abdulah-0/Portfolio-Abdullah-Khalid',
  'https://github.com/abdulah-0/Portfolio-Abdullah-Khalid'
),
(
  'Intelligent Automation Suite',
  'AI & Software Engineering',
  'A robust automated system designed for API orchestration, real-time data processing, and intelligent workflow automation built with Python, C++, and Node.js.',
  'Python, C++, Node.js, PostgreSQL, Express',
  '/images/placeholder.webp',
  'https://github.com/abdulah-0',
  'https://github.com/abdulah-0'
),
(
  'Full Stack Web Application',
  'Full Stack Development',
  'Modern web application featuring dynamic user dashboards, real-time database sync, authentication, and optimized API services.',
  'React, TypeScript, Node.js, Supabase, PostgreSQL',
  '/images/placeholder.webp',
  'https://github.com/abdulah-0',
  'https://github.com/abdulah-0'
);

-- 6. Supabase Storage Setup Instructions for Project Cover Pictures:
-- Go to Supabase Dashboard -> Storage -> Create new bucket:
-- Bucket Name: "projects"
-- Set Bucket Privacy: Public
-- Under Bucket Policies, allow Public Select and Public Insert.
