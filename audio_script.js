const audioFile = document.getElementById('audioFile')
const qualitySelect = document.getElementById('quality')
const progress = document.getElementById('progress')
const progressBar = document.getElementById('progressBar')
const result = document.getElementById('result')
const downloadLink = document.getElementById('downloadLink')

function compressAudio() {
  const file = audioFile.files[0]
  const quality = qualitySelect.value

  if (!file) {
    alert('Pilih file audio terlebih dahulu')
    return
  }

  progress.style.display = 'block'
  progressBar.style.width = '0%'

  const reader = new FileReader()
  reader.readAsArrayBuffer(file)
  reader.onload = function (event) {
    const arrayBuffer = event.target.result
    const worker = new Worker('worker.js')
    worker.postMessage({ arrayBuffer, quality })

    worker.onmessage = function (event) {
      if (event.data.type === 'progress') {
        progressBar.style.width = event.data.progress + '%'
      } else if (event.data.type === 'done') {
        const compressedAudio = event.data.compressedAudio
        const blob = new Blob([compressedAudio], { type: file.type })
        const url = URL.createObjectURL(blob)

        downloadLink.href = url
        downloadLink.textContent = 'Download'
        downloadLink.style.display = 'block' // Enable download link display

        // Optional: Release the temporary URL after download (consider user behavior)
        downloadLink.onclick = function () {
          window.URL.revokeObjectURL(url)
        }
      } else {
        console.error('Error during compression:', event.data.error)
      }
    }
  }
}
