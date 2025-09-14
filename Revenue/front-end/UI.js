const balance_text = document.getElementById("balance-text");
const activities_container = document.querySelector(".activities-container")

const buttonOpenPopup = document.getElementById("add-list-button")
const popUpForm = document.getElementById("pop-up-form");

const amountInput = document.getElementById("amount-form");
const dateInput = document.getElementById("date-form");
const activityInput = document.getElementById("activity-form");
const categoryInput = document.getElementById("category-form")

const submitBtn = document.getElementById("submit-activities");
const closeBtn = document.getElementById("close-form");
const clearBtn = document.getElementById("clear-button")

let showAll = true;


const categoryEmoji = {

        "Salary": "💰",
        "Transport": "🚌",
        "Food": "🍔",
        "Other": "📌"

}
function renderBalance() {

    const currency = data.settings?.currency || "฿";
    balance_text.textContent = data.balance.toFixed(2) + currency;

    
}

function renderActivities() {
    activities_container.innerHTML = "";

    let totalActivities = data.activities_list.length;
    let activitiesToShow;

    if (showAll) {
        activitiesToShow = [...data.activities_list]; // Show all
    } else {
        activitiesToShow = data.activities_list.slice(-4); // Only last 4
    }

    // Sort oldest first for timeline-like order (top = oldest)
    activitiesToShow.sort((a, b) => new Date(a.date) - new Date(b.date));

    let lastDate = null;

    activitiesToShow.forEach((act) => {
        const actDate = new Date(act.date).toLocaleDateString();

        // Add date header if new date
        if (actDate !== lastDate) {
            const dateHeader = document.createElement("div");
            dateHeader.textContent = actDate;
            dateHeader.style.fontWeight = "bold";
            dateHeader.style.marginTop = "10px";
            dateHeader.style.borderBottom = "1px solid #ccc";
            activities_container.appendChild(dateHeader);

            lastDate = actDate;
        }

        const div = document.createElement("div");
        div.classList.add("list-lastest-container");

        div.innerHTML = `
            <span class="amount ${act.amount < 0 ? "negative" : ""}">
                ${act.amount > 0 ? "+" : ""}${act.amount} ฿
            </span>
            <span class="note">${act.activity}</span>
            <span class="category">
                ${categoryEmoji[act.category]} ${act.category}
            </span>
        `;

        activities_container.appendChild(div);
    });

    // "+ more" for older activities at top
    if (!showAll && totalActivities > 4) {
        const more = document.createElement("div");
        more.textContent = `+${totalActivities - 4} more...`;
        more.style.textAlign = "left";
        more.style.opacity = "0.6";
        more.style.cursor = "pointer";
        more.addEventListener("click", () => {
            showAll = true;
            renderActivities();
        });
        activities_container.insertBefore(more, activities_container.firstChild); // Insert at top
    }

    // "Show less" hides older activities
    if (showAll && totalActivities > 4) {
        const less = document.createElement("div");
        less.textContent = "Show less";
        less.style.textAlign = "left";
        less.style.opacity = "0.6";
        less.style.cursor = "pointer";
        less.addEventListener("click", () => {
            showAll = false;
            renderActivities();
        });
        activities_container.appendChild(less);
    }
}

function OpenPopup() {
    popUpForm.style.display = "block";
}

function ClosePopup() {
    popUpForm.style.display = "none";
}

buttonOpenPopup.addEventListener('click', OpenPopup);
closeBtn.addEventListener('click', ClosePopup);

function AppendList() {
    const amount = parseFloat(amountInput.value);
    const date = dateInput.value;
    const activity = activityInput.value;
    const category = categoryInput.value;

    if(!isNaN(amount) && activity && date && category) {
        addActivity(amount,date,category,activity);
        ClosePopup();

        amountInput.value = '';
        dateInput.value = '';
        activityInput.value = '';
        categoryInput.value = '';
    }

    else{
       alert("Please Enter the field ");
    }
} 


testBtn.addEventListener('click', Test)
submitBtn.addEventListener('click', AppendList);

clearBtn.addEventListener('click', clearActivities);
