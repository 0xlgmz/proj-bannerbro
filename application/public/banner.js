let backgroundImageUrl = ''; // Global variable to store the background image URL

document.getElementById('bgImageInput').addEventListener('change', function(event) {
  const file = event.target.files[0];
  if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
          backgroundImageUrl = e.target.result; // Store the base64 URL of the image
          document.getElementById('removeBgImage').style.display = 'inline-block'; // Show remove button
          document.getElementById('imagePositionControls').style.display = 'block'; // Show position controls
          updateBanner(); // Update the banner with the new image
      };
      reader.readAsDataURL(file); // Convert the file to a base64 URL
  }
});

document.getElementById('removeBgImage').addEventListener('click', function() {
  backgroundImageUrl = ''; // Clear the background image URL
  document.getElementById('bgImageInput').value = ''; // Reset the file input
  document.getElementById('removeBgImage').style.display = 'none'; // Hide remove button
  document.getElementById('imagePositionControls').style.display = 'none'; // Hide position controls
  updateBanner(); // Update the banner without the image
});

// Event listeners for form fields
document.getElementById('bgColorInput').addEventListener('input', updateBanner);
document.getElementById('fontFamilyInput').addEventListener('change', updateBanner);
document.getElementById('fontColorInput').addEventListener('input', updateBanner);
document.getElementById('headerTextInput').addEventListener('input', updateBanner);
document.getElementById('subheaderTextInput').addEventListener('input', updateBanner);
document.getElementById('watermarkSwitch').addEventListener('change', updateBanner);
document.getElementById('boldHeaderTextSwitch').addEventListener('change', updateBanner);
document.getElementById('boldSubheaderTextSwitch').addEventListener('change', updateBanner);
document.getElementById('bgImagePosX').addEventListener('input', updateBanner);
document.getElementById('bgImagePosY').addEventListener('input', updateBanner);
document.getElementById('bgImageSize').addEventListener('input', updateBanner);

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
  var bannerWidth = document.getElementById('bannerTrueWidth').value;
  var bannerHeight = document.getElementById('bannerTrueHeight').value;
  const ratio = bannerHeight / bannerWidth;
  const isHeaderBold = document.getElementById('boldHeaderTextSwitch').checked;
  const isSubheaderBold = document.getElementById('boldSubheaderTextSwitch').checked;

  // Determine font-weight
  const headerFontWeight = isHeaderBold ? 'bold' : 'normal';
  const subheaderFontWeight = isSubheaderBold ? 'bold' : 'normal';

  // Determine background style
  const backgroundStyle = backgroundImageUrl ? `url(${backgroundImageUrl})` : bgColor;

  const backgroundPositionX = document.getElementById('bgImagePosX').value + '%';
  const backgroundPositionY = document.getElementById('bgImagePosY').value + '%';
  const backgroundSize = document.getElementById('bgImageSize').value + '%'; // Background size in %


  // Update banner preview
  bannerPreview.innerHTML = `
    <div id="bannerPreviewBody" style="background: ${backgroundStyle}; background-size: ${backgroundSize}; background-position: ${backgroundPositionX} ${backgroundPositionY}; font-family: ${fontFamily}; color: ${fontColor}; padding: 20px; text-align: center; position: relative; width: 100%; max-width: 100%; height: 0; padding-bottom: ${ratio*100}%;">
      <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; padding: 20px; box-sizing: border-box; display: flex; flex-direction: column; justify-content: center; align-items: center;">
        <h1 style="font-size: xxx-large; margin: 0; font-weight: ${headerFontWeight};">${headerText}</h1>
        <p style="font-size: large; margin: 0; font-weight: ${subheaderFontWeight};">${subheaderText}</p>
        ${showWatermark ? '<div style="position: absolute; font-size: small; top: 10px; left: 10px; background: rgba(255, 255, 255, 0.2); padding: 4px 10px; border-radius: 20px;">banner generated with bannerbro.com</div>' : ''}
      </div>
    </div>
  `;
}

// Initialize the banner preview on page load
updateBanner();

document.getElementById('downloadBanner').addEventListener('click', function() { 
  var bannerName = document.getElementById('bannerTrueName').value;
  var bannerWidth = document.getElementById('bannerTrueWidth').value;
  var bannerHeight = document.getElementById('bannerTrueHeight').value;
  cloneAndScaleBanner(bannerWidth, bannerHeight)

  html2canvas(document.querySelector("#cloned_bannerPreviewBody")).then(canvas => {
    canvas.toBlob(function(blob) {
      window.saveAs(blob, `bannerbro-${bannerName}.jpg`);
    });
    const rm = document.getElementById('cloned_bannerPreviewBody');
    rm.remove();
  });
});

document.getElementById('watermarkSwitch').addEventListener('change', function() {
  var tooltip = document.getElementById('coffeeTooltip');
  if (!this.checked) {
      tooltip.style.display = 'inline-block';  // Show the tooltip
  } else {
      tooltip.style.display = 'none';  // Hide the tooltip
  }
});

function cloneAndScaleBanner(originalWidth, originalHeight) {
  const bannerPreview = document.getElementById('bannerPreviewBody');

  // Create the clone
  const clonedBanner = bannerPreview.cloneNode(true);

  // Modify the clone's ID
  clonedBanner.id = 'cloned_bannerPreviewBody';
  newWidth = originalWidth;
  const newHeight = (newWidth * originalHeight) / originalWidth; // Maintain the aspect ratio

  // Automatically calculate the scale factor
  const scaleFactor = newWidth / originalWidth;

  // Adjust the size of the cloned banner
  clonedBanner.style.width = `${newWidth}px`;
  clonedBanner.style.height = `${newHeight}px`;
  clonedBanner.style.padding = '0';
  clonedBanner.style.maxWidth = 'none';

  // Adjust the inner content to scale proportionally
  const innerDiv = clonedBanner.querySelector('div > div');
  innerDiv.style.padding = `${20 * scaleFactor}px`; // Scale padding
  const h1 = innerDiv.querySelector('h1');
  h1.style.fontSize = `${scaleFactor * 6}em`; // Automatically scale font size
  const p = innerDiv.querySelector('p');
  p.style.fontSize = `${scaleFactor * 3}em`; // Automatically scale font size

  // Handle watermark font size if present
  const watermark = innerDiv.querySelector('div[style*="font-size: small;"]');
  if (watermark) {
    watermark.style.fontSize = `${scaleFactor * 0.75}em`;
  }

  // Insert the cloned banner into the DOM
  document.body.appendChild(clonedBanner);
}


