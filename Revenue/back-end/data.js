let data = {
    balance: 0,
    activities_list: [],
    setting: {
        currency : '฿'
    }
 
}

function generateID() {
    return '_' + Math.random().toString(36).substring(2,9);
}



function clearActivities() {
    data.balance = 0
    data.activities_list = []
    renderActivities();
    renderBalance();

}

function saveData() {
  
   localStorage.setItem("FinanceData", JSON.stringify(data)) ;
   
}

function loadData() {
    try {
        const saved = localStorage.getItem("FinanceData");
        if (saved) {
            const parsed = JSON.parse(saved);
            if (parsed.activities_list && Array.isArray(parsed.activities_list)) {
                data = parsed;
            }
        }
    } catch (e) {
        console.error("Failed to load data:", e);
    }
}


function UpdateBalance(amount) {

    data.balance += amount
    saveData();
    renderBalance();

}


function addActivity(amount,date,category,activity){
     
    data.activities_list.push({
        amount, 
        date, 
        category, 
        activity,
        id: generateID()

    });

    UpdateBalance(amount);
    saveData();
    renderActivities();
    console.log(data.activities_list);
    
}

window.addEventListener("DOMContentLoaded", () => {
    loadData();          
    renderBalance();     
    renderActivities(); 
});
