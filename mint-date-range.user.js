// ==UserScript==
// @name         mint-date-range
// @version      0.1
// @author       ac4466
// @match        https://mint.intuit.com/transaction*
// @grant        GM_addStyle
// ==/UserScript==

(function() {
  'use strict';

  const container = document.createElement('div');
  container.setAttribute('id', 'mint-container');

  // start date
  const startDateField = document.createElement('label');
  startDateField.innerHTML = 'Start Date';

  const startDate = document.createElement('input');
  startDate.type = "date";

  startDateField.appendChild(startDate);
  container.appendChild(startDateField);

  // end date
  const endDateField = document.createElement('label');
  endDateField.innerHTML = 'End Date';

  const endDate = document.createElement('input');
  endDate.type = "date";

  endDateField.appendChild(endDate);
  container.appendChild(endDateField);

  // submit button
  const submit = document.createElement('button');
  submit.type = 'button';
  submit.innerHTML = 'Submit';
  submit.setAttribute('id', 'mint-submit');
  container.appendChild(submit);

  // append all elements
  document.body.appendChild(container);

  const submitHandler = () => {
    if (startDate.value || endDate.value) {
      const searchParams = new URLSearchParams(window.location.search);

      if (startDate.value) {
        searchParams.set("startDate", new Date(startDate.value).toLocaleString('en-US', {timeZone: 'UTC'}).split(',')[0]);
      } else {
        searchParams.delete("startDate");
      }

      if (endDate.value) {
        searchParams.set("endDate", new Date(endDate.value).toLocaleString('en-US', {timeZone: 'UTC'}).split(',')[0]);
      } else {
        searchParams.delete("endDate");
      }

      window.location.search = searchParams.toString();
    }
  }

  submit.addEventListener('click', submitHandler);

  GM_addStyle(`
    #mint-container {
      max-width: 150px;
      position: fixed;
      right: 10px;
      bottom: 10px;
      background-color: #04a4b6;
      z-index: 9999999;
      display: flex;
      flex-flow: column nowrap;
      gap: 10px;
      padding: 10px;
      color: white;
    }

    #mint-submit {
      margin-top: 10px;
      width: 100%;
      color: white;
    }`
  );

})();
