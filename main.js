document.addEventListener('DOMContentLoaded', function(){
  document.getElementById('year').textContent = new Date().getFullYear();

  const modal = document.getElementById('modal');
  const modalClose = document.getElementById('modalClose');
  const enquireButtons = document.querySelectorAll('.enquire, #enquireBtn, #heroEnquire');
  const bookingForm = document.getElementById('bookingForm');
  const formStatus = document.getElementById('formStatus');

  enquireButtons.forEach(btn=>btn.addEventListener('click', openModal));
  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e)=>{ if(e.target===modal) closeModal(); });

  function openModal(){ modal.setAttribute('aria-hidden','false'); document.getElementById('name').focus(); }
  function closeModal(){ modal.setAttribute('aria-hidden','true'); }

  // Simple client-side validation + Netlify function submit
  bookingForm.addEventListener('submit', function(e){
    e.preventDefault();
    formStatus.textContent = '';
    const name = bookingForm.name.value.trim();
    const email = bookingForm.email.value.trim();
    if(!name || !email){ formStatus.textContent = 'Please fill required fields (name & email).'; return; }

    const payload = {
      name: bookingForm.name.value,
      email: bookingForm.email.value,
      phone: bookingForm.phone.value,
      dates: bookingForm.dates.value,
      message: bookingForm.message.value
    };

    // Try using Netlify Function endpoint; fallback to native form submission via fetch to '/' for Netlify Forms
    fetch('/.netlify/functions/submit', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify(payload)
    }).then(resp=>{
      if(resp.ok) return resp.json();
      throw new Error('Function error');
    }).then(data=>{
      formStatus.textContent = 'Thanks! Your enquiry was sent.';
      bookingForm.reset();
      setTimeout(()=>{ closeModal(); }, 1200);
    }).catch(err=>{
      // Fallback: submit using form POST (this will work on Netlify with data-netlify="true")
      fetch('/', {
        method:'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: new URLSearchParams(new FormData(bookingForm)).toString()
      }).then(r=>{
        formStatus.textContent = 'Thanks! Your enquiry was sent (fallback).';
        bookingForm.reset();
        setTimeout(()=>{ closeModal(); }, 1200);
      }).catch(e=>{
        formStatus.textContent = 'Sorry — there was an error. Please try again later.';
        console.error(e);
      });
    });
  });

  // Save draft locally
  document.getElementById('saveDraft').addEventListener('click', function(){
    const draft = {
      name: bookingForm.name.value,
      email: bookingForm.email.value,
      phone: bookingForm.phone.value,
      dates: bookingForm.dates.value,
      message: bookingForm.message.value,
      savedAt: new Date().toISOString()
    };
    localStorage.setItem('northeast_enquiry_draft', JSON.stringify(draft));
    alert('Draft saved locally.');
  });

  // Load draft if present
  const saved = localStorage.getItem('northeast_enquiry_draft');
  if(saved){
    try{
      const d = JSON.parse(saved);
      bookingForm.name.value = d.name || '';
      bookingForm.email.value = d.email || '';
      bookingForm.phone.value = d.phone || '';
      bookingForm.dates.value = d.dates || '';
      bookingForm.message.value = d.message || '';
    }catch(e){}
  }
});
