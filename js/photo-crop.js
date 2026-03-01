let cropImg = null;
let cropState = { x: 0, y: 0, zoom: 1, dragging: false, lastX: 0, lastY: 0 };
const CROP_SIZE = 280;
const EXPORT_SIZE = 400;

function handlePhotoUpload(e) {
  const file = e.target.files[0];
  if (!file) return;
  if (file.size > 2 * 1024 * 1024) { alert('Photo must be under 2MB'); return; }
  const reader = new FileReader();
  reader.onload = function(ev) {
    openCropModal(ev.target.result);
  };
  reader.readAsDataURL(file);
}

function openCropModal(src) {
  cropImg = new Image();
  cropImg.onload = function() {
    cropState = { x: 0, y: 0, zoom: 1, dragging: false, lastX: 0, lastY: 0 };
    document.getElementById('cropZoom').value = 1;
    const canvas = document.getElementById('cropCanvas');
    canvas.width = CROP_SIZE;
    canvas.height = CROP_SIZE;
    drawCrop();
    document.getElementById('cropOverlay').classList.add('visible');
    initCropDrag();
  };
  cropImg.src = src;
}

function closeCropModal() {
  document.getElementById('cropOverlay').classList.remove('visible');
  document.getElementById('photoInput').value = '';
}

function drawCrop() {
  const canvas = document.getElementById('cropCanvas');
  const ctx = canvas.getContext('2d');
  const z = cropState.zoom;
  const aspect = cropImg.width / cropImg.height;
  let dw, dh;
  if (aspect >= 1) {
    dh = CROP_SIZE * z;
    dw = dh * aspect;
  } else {
    dw = CROP_SIZE * z;
    dh = dw / aspect;
  }
  const dx = (CROP_SIZE - dw) / 2 + cropState.x;
  const dy = (CROP_SIZE - dh) / 2 + cropState.y;
  ctx.clearRect(0, 0, CROP_SIZE, CROP_SIZE);
  ctx.drawImage(cropImg, dx, dy, dw, dh);
}

function onCropZoom() {
  cropState.zoom = parseFloat(document.getElementById('cropZoom').value);
  clampPan();
  drawCrop();
}

function clampPan() {
  const z = cropState.zoom;
  const aspect = cropImg.width / cropImg.height;
  let dw, dh;
  if (aspect >= 1) { dh = CROP_SIZE * z; dw = dh * aspect; }
  else { dw = CROP_SIZE * z; dh = dw / aspect; }
  const maxX = Math.max(0, (dw - CROP_SIZE) / 2);
  const maxY = Math.max(0, (dh - CROP_SIZE) / 2);
  cropState.x = Math.min(maxX, Math.max(-maxX, cropState.x));
  cropState.y = Math.min(maxY, Math.max(-maxY, cropState.y));
}

function initCropDrag() {
  const wrap = document.getElementById('cropWrap');
  function startDrag(cx, cy) { cropState.dragging = true; cropState.lastX = cx; cropState.lastY = cy; }
  function moveDrag(cx, cy) {
    if (!cropState.dragging) return;
    cropState.x += cx - cropState.lastX;
    cropState.y += cy - cropState.lastY;
    cropState.lastX = cx;
    cropState.lastY = cy;
    clampPan();
    drawCrop();
  }
  function endDrag() { cropState.dragging = false; }
  wrap.onmousedown = e => { e.preventDefault(); startDrag(e.clientX, e.clientY); };
  window.addEventListener('mousemove', e => moveDrag(e.clientX, e.clientY));
  window.addEventListener('mouseup', endDrag);
  wrap.ontouchstart = e => { const t = e.touches[0]; startDrag(t.clientX, t.clientY); };
  wrap.ontouchmove = e => { e.preventDefault(); const t = e.touches[0]; moveDrag(t.clientX, t.clientY); };
  wrap.ontouchend = endDrag;
  wrap.onwheel = e => {
    e.preventDefault();
    const slider = document.getElementById('cropZoom');
    let newZ = cropState.zoom - e.deltaY * 0.002;
    newZ = Math.min(3, Math.max(1, newZ));
    cropState.zoom = newZ;
    slider.value = newZ;
    clampPan();
    drawCrop();
  };
}

function saveCrop() {
  const out = document.createElement('canvas');
  out.width = EXPORT_SIZE;
  out.height = EXPORT_SIZE;
  const ctx = out.getContext('2d');
  const z = cropState.zoom;
  const aspect = cropImg.width / cropImg.height;
  let dw, dh;
  if (aspect >= 1) { dh = EXPORT_SIZE * z; dw = dh * aspect; }
  else { dw = EXPORT_SIZE * z; dh = dw / aspect; }
  const dx = (EXPORT_SIZE - dw) / 2 + (cropState.x / CROP_SIZE * EXPORT_SIZE);
  const dy = (EXPORT_SIZE - dh) / 2 + (cropState.y / CROP_SIZE * EXPORT_SIZE);
  ctx.beginPath();
  ctx.arc(EXPORT_SIZE / 2, EXPORT_SIZE / 2, EXPORT_SIZE / 2, 0, Math.PI * 2);
  ctx.closePath();
  ctx.clip();
  ctx.drawImage(cropImg, dx, dy, dw, dh);
  photoDataUrl = out.toDataURL('image/jpeg', 0.92);
  document.getElementById('photoImg').src = photoDataUrl;
  document.getElementById('photoPreview').style.display = 'flex';
  document.getElementById('photoPlaceholder').style.display = 'none';
  closeCropModal();
}

function removePhoto() {
  photoDataUrl = '';
  document.getElementById('photoInput').value = '';
  document.getElementById('photoPreview').style.display = 'none';
  document.getElementById('photoPlaceholder').style.display = 'flex';
}
