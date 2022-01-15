// ==UserScript==
// @name         mint-date-range
// @version      0.2
// @author       ac4466
// @match        https://mint.intuit.com/transaction*
// @grant        GM_addStyle
// ==/UserScript==

(function() {
  'use strict';

  const container = document.createElement('div');
  container.setAttribute('class', 'mint-container');

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

  // X button
  const hide = document.createElement('button');
  hide.type = 'button';
  hide.innerHTML = 'X';
  hide.setAttribute('id', 'mint-hide');
  container.appendChild(hide);

  // + button
  const showContainer = document.createElement('div');
  showContainer.setAttribute('class', 'mint-container');
  showContainer.style.display = 'none';

  const show = document.createElement('button');
  show.type = 'button';
  show.innerHTML = '+';
  show.setAttribute('id', 'mint-show');

  showContainer.appendChild(show);

  // append all containers
  document.body.appendChild(container);
  document.body.appendChild(showContainer);

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

  const hideHandler = () => {
    container.style.display = 'none';
    showContainer.style.display = 'block';
  }

  const showHandler = () => {
    container.style.display = 'block';
    showContainer.style.display = 'none';
  }

  submit.addEventListener('click', submitHandler);
  hide.addEventListener('click', hideHandler);
  show.addEventListener('click', showHandler);

  GM_addStyle(`
    .mint-container {
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

    #mint-show {
      color: white;
    }

    #mint-hide {
      color: white;
      position: absolute;
      top: 4px;
      right: 5px;
    }

    #mint-submit {
      margin-top: 10px;
      width: 100%;
      color: white;
    }`
  );

})();
