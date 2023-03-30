
        const inputEl = document.querySelector("#password");
        const upperCaseCheckEl = document.querySelector("#uppercase-check");
        const lowerCaseCheckEl = document.querySelector("#lowercase-check");
        const numberCheckEl = document.querySelector("#number-check");
        const symbolCheckEl = document.querySelector("#symbol-check");
        const securityIndicatorBarEl = document.querySelector(
        "#security-indicator-bar");
        const securityIndicatorForcasenhaEl = document.querySelector("#security-indicator-forcasenha");

      let passwordLength = 14;

      function generatePassword() {
        let chars = "";

        const upperCaseChars = "ABCDEFGHJKMNOPQRSTUVWXYZ";
        const lowerCaseChars = "abcdefghjkmnopqrstuvwxyz";
        const numberChars = "0123456789";
        const symbolChars = "?!@&*()[]";

        if (upperCaseCheckEl.checked) {
          chars += upperCaseChars;
        }
        if (lowerCaseCheckEl.checked) {
          chars += lowerCaseChars;
        }
        if (numberCheckEl.checked) {
          chars += numberChars;
        }
        if (symbolCheckEl.checked) {
          chars += symbolChars;
        }
      
        let password = "";
      
        for (let i = 0; i < passwordLength; i++) {
          const randonNumber = Math.floor(Math.random() * chars.length);
          password += chars.substring(randonNumber, randonNumber + 1);
        }

        inputEl.value = password;

        calculateQuality();
        calculateFontSize();
      }

      function calculateQuality() {
        const percent = Math.round(
          (passwordLength / 70) * 42 +
            (upperCaseCheckEl.checked ? 13 : 0) +
            (lowerCaseCheckEl.checked ? 13 : 0) +
            (numberCheckEl.checked ? 16 : 0) +
            (symbolCheckEl.checked ? 16 : 0)
        );

        securityIndicatorBarEl.style.width = `${percent}%`;

        if (percent > 55 && passwordLength >= 10) {
          securityIndicatorBarEl.classList.remove("critical");
          securityIndicatorBarEl.classList.remove("warning");
          securityIndicatorBarEl.classList.add("safe");
          securityIndicatorForcasenhaEl.classList.remove("fraca");
          securityIndicatorForcasenhaEl.classList.remove("media");
          securityIndicatorForcasenhaEl.classList.add("forte");
          document.querySelector(".forcasenha").textContent = "Forte";
        } else if (percent > 30 && passwordLength >= 6) {
          securityIndicatorBarEl.classList.remove("critical");
          securityIndicatorBarEl.classList.remove("safe");
          securityIndicatorBarEl.classList.add("warning");
          securityIndicatorForcasenhaEl.classList.remove("fraca");
          securityIndicatorForcasenhaEl.classList.add("media");
          securityIndicatorForcasenhaEl.classList.remove("forte");
          document.querySelector(".forcasenha").textContent = "Média";
        } else if (percent < 30 | passwordLength < 5) {
          securityIndicatorBarEl.classList.remove("safe");
          securityIndicatorBarEl.classList.remove("warning");
          securityIndicatorBarEl.classList.add("critical");
          securityIndicatorForcasenhaEl.classList.add("fraca");
          securityIndicatorForcasenhaEl.classList.remove("media");
          securityIndicatorForcasenhaEl.classList.remove("forte");
          document.querySelector(".forcasenha").textContent = "Fraca";
        }
        if (percent >=100) {
          securityIndicatorBarEl.classList.add("completed")
        } else {
          securityIndicatorBarEl.classList.remove("completed")
        }
      }

      function calculateFontSize() {
        if(passwordLength > 45) {
        inputEl.classList.remove("font-sm")
        inputEl.classList.remove("font-xs")
        inputEl.classList.add("font-xxs")
        } else if (passwordLength > 33) {
        inputEl.classList.remove("font-sm")
        inputEl.classList.add("font-xs")
        inputEl.classList.remove("font-xxs")
        } else if (passwordLength > 20) {
        inputEl.classList.add("font-sm")
        inputEl.classList.remove("font-xs")
        inputEl.classList.remove("font-xxs")
        } else {
        inputEl.classList.remove("font-sm")
        inputEl.classList.remove("font-xs")
        inputEl.classList.remove("font-xxs")          
        }
      }

        function copy() {
          navigator.clipboard.writeText(inputEl.value);
        }

        const passwordLengthEl = document.querySelector("#password-length");
        passwordLengthEl.addEventListener("input", function () {
          passwordLength = passwordLengthEl.value;
          document.querySelector("#password-length-text").innerText =
            passwordLength;
          generatePassword();
        });
      
      upperCaseCheckEl.addEventListener("click", generatePassword);
      lowerCaseCheckEl.addEventListener("click", generatePassword);
      numberCheckEl.addEventListener("click", generatePassword);
      symbolCheckEl.addEventListener("click", generatePassword);

      document.querySelector("#copy-1").addEventListener("click", copy);
      document.querySelector("#copy-2").addEventListener("click", copy);
      document.querySelector("#refresh").addEventListener("click", generatePassword)

      generatePassword();