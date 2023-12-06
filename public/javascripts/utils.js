// This file contains code for 
// switching tabs, global ajax
const tab_switches = document.getElementsByClassName('app-main-desktop__links');
const tabs = document.getElementsByClassName('app-mainTab__Tabs');

for (let i = 0; i < tab_switches.length; i++) {
    tab_switches[i].onclick = (event) => {
        console.log("clicked")
        let target = event.currentTarget.getAttribute('data-attribute');
        for (let i = 0; i < tabs.length; i++) {
            let tab_to_select = tabs[i];
            if (tab_to_select.id == target) {
                for (const tab of tabs) {
                    tab.style.display = 'none';
                }
                tab_to_select.style.display = 'block';
            }
        }
        for (const tab_switch of tab_switches) {
            tab_switch.classList.remove('active_tabBtn');
        }
        tab_switches[i].classList.add("active_tabBtn");
    }
}

window.GlobalAjax = function () {
    this.performRequest = (action, data) => {
        return fetch('/dailyHub', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ action, data }),
        })
            .then(response => {
                return response.json();
            })
            .catch(error => {
                console.error('Error performing ajax:', error);
                throw error;
            });
    }
}
