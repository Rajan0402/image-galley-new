export async function downloadImage(url: string, name: string) {
  if (url) {
    try {
      const response = await fetch(url);
      if (response.status !== 200) {
        console.log("Error while fetching image");
        return;
      }
      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = imageUrl;
      a.download = name;
      a.click();
      URL.revokeObjectURL(url); // Clean up the URL object
    } catch (error) {
      console.log("Error while downloading image:", error);
    }
  }
}