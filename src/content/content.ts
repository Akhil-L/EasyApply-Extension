declare const chrome: any;

chrome.storage.local.get(['profile'], (result: any) => {
  const profile = result.profile;

  if (!profile) return;

  const inputs = document.querySelectorAll('input');

  inputs.forEach((input: any) => {
    const placeholder =
      input.placeholder?.toLowerCase() || '';

    const name =
      input.name?.toLowerCase() || '';

    if (
      placeholder.includes('name') ||
      name.includes('name')
    ) {
      input.value = profile.name || '';
    }

    if (
      placeholder.includes('email') ||
      name.includes('email')
    ) {
      input.value = profile.email || '';
    }
  });
});