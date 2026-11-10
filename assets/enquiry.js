const enquiryForm = document.querySelector('#enquiry-form');

function buildEnquiryMessage(data) {
  return [
    'Hi Rico, I would like to discuss a project.',
    `Name: ${data.get('name')}`,
    `Location: ${data.get('location')}`,
    `Interested in: ${data.get('service')}`,
    `Timing: ${data.get('timing') || 'Not yet decided'}`,
    `Budget: ${data.get('budget') || 'Not yet decided'}`,
    '',
    String(data.get('message')),
  ].join('\n');
}

function openEnquiryDraft(event) {
  event.preventDefault();
  if (!enquiryForm.reportValidity()) return;
  const message = buildEnquiryMessage(new FormData(enquiryForm));
  const channel = event.submitter?.value || 'whatsapp';
  const encoded = encodeURIComponent(message);
  const destination = channel === 'email'
    ? `mailto:strinatidesign@gmail.com?subject=Residential%20project%20enquiry&body=${encoded}`
    : `https://wa.me/447398312805?text=${encoded}`;
  document.querySelector('#enquiry-status').textContent = 'Opening your draft. Your enquiry is not sent until you send it in the selected app.';
  window.location.assign(destination);
}

if (enquiryForm) {
  const serviceNames = {
    'site-potential': 'Site Potential Review',
    'concept-design': 'Concept & Layout Design',
    'planning-documentation': 'Planning & Documentation',
  };
  const selected = new URLSearchParams(window.location.search).get('service');
  if (Object.hasOwn(serviceNames, selected)) enquiryForm.elements.service.value = serviceNames[selected];
  enquiryForm.addEventListener('submit', openEnquiryDraft);
  enquiryForm.hidden = false;
}
