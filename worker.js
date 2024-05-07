import { compress } from 'jllib'

self.onmessage = function (event) {
  const { arrayBuffer, quality } = event.data
  const audioData = new Uint8Array(arrayBuffer)

  try {
    const compressedAudio = compress(audioData, {
      quality: {
        level: quality, // Sesuaikan level kualitas (low, medium, high)
      },
    })
    self.postMessage({ type: 'done', compressedAudio })
  } catch (error) {
    self.postMessage({ type: 'error', error: error.message })
  }
}
