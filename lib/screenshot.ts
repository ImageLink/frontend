import { z } from 'zod';

const screenshotApiKey = process.env.SCREENSHOT_API_KEY!;
const baseUrl = 'https://api.screenshotapi.net/screenshot';

export const screenshotSchema = z.object({
  url: z.string().url(),
  width: z.number().optional(),
  height: z.number().optional(),
  output: z.enum(['image', 'json']).optional(),
  full_page: z.boolean().optional(),
  delay: z.number().optional(),
});

export type ScreenshotOptions = z.infer<typeof screenshotSchema>;

export async function captureScreenshot(options: ScreenshotOptions) {
  try {
    const params = new URLSearchParams({
      token: screenshotApiKey,
      url: options.url,
      width: (options.width || 1200).toString(),
      height: (options.height || 630).toString(),
      output: options.output || 'json',
      full_page: (options.full_page || false).toString(),
      delay: (options.delay || 1000).toString(),
    });

    const response = await fetch(`${baseUrl}?${params.toString()}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to capture screenshot');
    }

    return data;
  } catch (error) {
    console.error('Screenshot capture error:', error);
    throw error;
  }
}