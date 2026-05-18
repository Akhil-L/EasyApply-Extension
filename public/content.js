function setNativeValue(element, value) {
  const valueSetter =
    Object.getOwnPropertyDescriptor(element, 'value')?.set;

  const prototype = Object.getPrototypeOf(element);

  const prototypeValueSetter =
    Object.getOwnPropertyDescriptor(prototype, 'value')?.set;

  if (prototypeValueSetter && valueSetter !== prototypeValueSetter) {
    prototypeValueSetter.call(element, value);
  } else if (valueSetter) {
    valueSetter.call(element, value);
  }

  element.dispatchEvent(
    new Event('input', { bubbles: true })
  );
}

chrome.storage.local.get(['profile'], (result) => {
  const profile = result.profile;

  if (!profile) return;

  function autofill() {
    const inputs = document.querySelectorAll('input');

    inputs.forEach((input) => {
      const text = `
        ${input.placeholder || ''}
        ${input.name || ''}
        ${input.id || ''}
        ${input.type || ''}
        ${input.labels?.[0]?.innerText || ''}
      `.toLowerCase();

      // EMAIL
      if (text.includes('email')) {
        setNativeValue(input, profile.email || '');
      }

      // FIRST NAME
      if (
        text.includes('first') &&
        text.includes('name')
      ) {
        setNativeValue(input, profile.name?.split(' ')[0] || '');
      }

      // LAST NAME
      if (
        text.includes('last') &&
        text.includes('name')
      ) {
        setNativeValue(
          input,
          profile.name?.split(' ').slice(1).join(' ') || ''
        );
      }

      // FULL NAME
      if (
        text.includes('full name') ||
        (text.includes('name') &&
          !text.includes('first') &&
          !text.includes('last'))
      ) {
        setNativeValue(input, profile.name || '');
      }
    });
  }

  autofill();

  setTimeout(autofill, 2000);
  setTimeout(autofill, 4000);
});