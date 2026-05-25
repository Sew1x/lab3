function generatePassword() {
    const length = parseInt(document.getElementById('length').value);
    const hasLower = document.getElementById('lowercase').checked;
    const hasUpper = document.getElementById('uppercase').checked;
    const hasNumbers = document.getElementById('numbers').checked;
    const hasSymbols = document.getElementById('symbols').checked;

    const lowerSet = "abcdefghijklmnopqrstuvwxyz";
    const upperSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numberSet = "0123456789";
    const symbolSet = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    let charPool = "";
    if (hasLower) charPool += lowerSet;
    if (hasUpper) charPool += upperSet;
    if (hasNumbers) charPool += numberSet;
    if (hasSymbols) charPool += symbolSet;

    const output = document.getElementById('generated-password');

    if (charPool === "") {
        output.value = "Оберіть хоча б одну умову!";
        return;
    }

    let password = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charPool.length);
        password += charPool[randomIndex];
    }

    output.value = password;
}
