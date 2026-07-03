import { NextResponse } from 'next/server';
import { bundle } from '@remotion/bundler';
import { renderMedia, selectComposition } from '@remotion/renderer';
import path from 'path';
import os from 'os';
import fs from 'fs';

export async function POST(req: Request) {
  try {
    const { template, title, subtitle, brandColor } = await req.json();

    const compositionId = template || "HeroScene";
    
    console.log("Bundling Remotion project...");
    const bundleLocation = await bundle({
      entryPoint: path.resolve(process.cwd(), "src/remotion/index.ts"),
    });

    const inputProps = {
      title,
      subtitle,
      brandColor,
    };

    console.log("Selecting composition:", compositionId);
    const composition = await selectComposition({
      serveUrl: bundleLocation,
      id: compositionId,
      inputProps,
    });

    const outputLocation = path.join(os.tmpdir(), `render-${Date.now()}.mp4`);

    console.log("Rendering media to:", outputLocation);
    await renderMedia({
      composition,
      serveUrl: bundleLocation,
      codec: "h264",
      outputLocation,
      inputProps,
    });

    console.log("Render complete. Sending file to client...");
    const fileBuffer = fs.readFileSync(outputLocation);
    
    // Cleanup temporary file
    fs.unlinkSync(outputLocation);

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": "video/mp4",
        "Content-Disposition": `attachment; filename="motion-graphics.mp4"`,
      },
    });

  } catch (error: any) {
    console.error("Render error:", error);
    return NextResponse.json({ error: error.message || "Failed to render video" }, { status: 500 });
  }
}
