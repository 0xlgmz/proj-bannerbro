// Event listeners for form fields
document.getElementById('bgColorInput').addEventListener('input', updateBanner);
document.getElementById('fontFamilyInput').addEventListener('change', updateBanner);
document.getElementById('fontColorInput').addEventListener('input', updateBanner);
document.getElementById('headerTextInput').addEventListener('input', updateBanner);
document.getElementById('subheaderTextInput').addEventListener('input', updateBanner);
document.getElementById('watermarkSwitch').addEventListener('change', updateBanner);

function generateBanner() {
  // This function can be called when needed but isn't required for live updates
  updateBanner();
}

function updateBanner() {
  const bannerPreview = document.getElementById('bannerPreview');

  // Fetch user settings
  const bgColor = document.getElementById('bgColorInput').value;
  const fontFamily = document.getElementById('fontFamilyInput').value;
  const fontColor = document.getElementById('fontColorInput').value;
  const headerText = document.getElementById('headerTextInput').value;
  const subheaderText = document.getElementById('subheaderTextInput').value;
  const showWatermark = document.getElementById('watermarkSwitch').checked;

  // Update banner preview
  bannerPreview.innerHTML = `
    <div style="background-color: ${bgColor}; font-family: ${fontFamily}; color: ${fontColor}; padding: 20px; text-align: center; position: relative; height: 315px; width: 851px;">
      <h1>${headerText}</h1>
      <p>${subheaderText}</p>
      ${showWatermark ? '<div style="position: absolute; font-size:small; top: 10px; left: 10px; background: rgba(255, 255, 255, 0.2); padding: 5px 10px; border-radius: 20px;">banner generated with bannerbro.com</div>' : ''}
    </div>
  `;
}

// Initialize the banner preview on page load
updateBanner();