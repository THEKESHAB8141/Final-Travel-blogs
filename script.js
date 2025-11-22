function prefillContactForm(hotelName, roomName, roomPrice) {
  document.getElementById("form-hotel").value = hotelName || "";
  document.getElementById("form-room").value = roomName || "";
  document.getElementById("form-price").value = roomPrice || "";
  window.location.hash = "#contact";
}

function bookNow(hotel, room, price) {
  prefillContactForm(hotel, room, price);
}
