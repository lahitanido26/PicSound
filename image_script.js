const imageFile = document.getElementById('image-file')
const imageWidthInput = document.getElementById('image-width')
const imageHeightInput = document.getElementById('image-height')
const resizeImageButton = document.getElementById('resize-image-button')
const imagePreview = document.getElementById('image-preview')
const previewImage = document.getElementById('preview-image')
const previewWidth = document.getElementById('preview-width')
const previewHeight = document.getElementById('preview-height')
const imageDownload = document.getElementById('image-download')
const imageDownloadLink = document.getElementById('image-download-link')

resizeImageButton.addEventListener('click', () => {
  if (imageFile.files.length === 0) {
    alert('Silakan pilih file gambar terlebih dahulu.')
    return
  }

  const file = imageFile.files[0]
  const reader = new FileReader()

  reader.onload = (event) => {
    const image = new Image()
    image.src = event.target.result

    image.onload = () => {
      const newWidth = parseInt(imageWidthInput.value, 10)
      const newHeight = parseInt(imageHeightInput.value, 10)

      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      canvas.width = newWidth
      canvas.height = newHeight

      ctx.drawImage(
        image,
        0,
        0,
        image.width,
        image.height,
        0,
        0,
        newWidth,
        newHeight
      )

      previewImage.src = canvas.toDataURL('image/png')
      previewWidth.textContent = newWidth
      previewHeight.textContent = newHeight

      imagePreview.style.display = 'block'
      imageDownload.style.display = 'block'
    }
  }

  reader.readAsDataURL(file)
})

// Download functionality
imageDownloadLink.addEventListener('click', () => {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  canvas.width = parseInt(previewWidth.textContent, 10)
  canvas.height = parseInt(previewHeight.textContent, 10)

  ctx.drawImage(previewImage, 0, 0)

  const dataURL = canvas.toDataURL('image/png')
  imageDownloadLink.href = dataURL
  imageDownloadLink.download = 'gambar-yang-diubah-ukurannya.png'
})
