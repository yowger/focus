export const toDataURL = (url: string) =>
    fetch(url)
        .then((response) => response.blob())
        .then((blob) => URL.createObjectURL(blob))

export const download = async (url: string, imageName: string) => {
    const a = document.createElement("a")
    a.href = await toDataURL(url)
    a.download = imageName
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
}
