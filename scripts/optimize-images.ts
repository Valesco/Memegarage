import sharp from 'sharp'
import { readdir, mkdir } from 'fs/promises'
import { join, extname, basename } from 'path'

const PUBLIC_IMAGES = join(import.meta.dirname, '..', 'public', 'images')
const OUTPUT_DIR = join(PUBLIC_IMAGES, 'optimized')

const CATEGORIES = ['pomp', 'poemp', 'afgenegerd']
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp']

const MAX_WIDTH = 800
const QUALITY = 75

async function optimizeImage(inputPath: string, outputPath: string): Promise<void> {
  const ext = extname(inputPath).toLowerCase()

  let pipeline = sharp(inputPath).resize({ width: MAX_WIDTH, withoutEnlargement: true })

  if (ext === '.png') {
    pipeline = pipeline.webp({ quality: QUALITY })
    outputPath = outputPath.replace(/\.png$/i, '.webp')
  } else {
    pipeline = pipeline.webp({ quality: QUALITY })
    outputPath = outputPath.replace(/\.(jpg|jpeg)$/i, '.webp')
  }

  await pipeline.toFile(outputPath)
  console.log(`  ✓ ${basename(inputPath)} → ${basename(outputPath)}`)
}

async function processDirectory(dirName: string): Promise<void> {
  const inputDir = join(PUBLIC_IMAGES, dirName)
  const outputDir = join(OUTPUT_DIR, dirName)

  await mkdir(outputDir, { recursive: true })

  const files = await readdir(inputDir)
  const imageFiles = files.filter((f) =>
    IMAGE_EXTENSIONS.includes(extname(f).toLowerCase())
  )

  console.log(`\nProcessing ${dirName}/ (${imageFiles.length} images)`)

  for (const file of imageFiles) {
    await optimizeImage(join(inputDir, file), join(outputDir, file))
  }
}

async function processRootImages(): Promise<void> {
  const outputDir = OUTPUT_DIR
  await mkdir(outputDir, { recursive: true })

  const files = await readdir(PUBLIC_IMAGES)
  const imageFiles = files.filter(
    (f) =>
      IMAGE_EXTENSIONS.includes(extname(f).toLowerCase()) &&
      f !== 'optimized'
  )

  if (imageFiles.length > 0) {
    console.log(`\nProcessing root images (${imageFiles.length} images)`)
    for (const file of imageFiles) {
      await optimizeImage(join(PUBLIC_IMAGES, file), join(outputDir, file))
    }
  }
}

async function main(): Promise<void> {
  console.log('🖼️  Optimizing images for web...')
  console.log(`   Max width: ${MAX_WIDTH}px, Quality: ${QUALITY}%, Format: WebP`)

  await mkdir(OUTPUT_DIR, { recursive: true })

  await processRootImages()

  for (const category of CATEGORIES) {
    await processDirectory(category)
  }

  console.log('\n✅ Done! Optimized images saved to public/images/optimized/')
}

main().catch(console.error)
