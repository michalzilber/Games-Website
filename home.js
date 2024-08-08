//----------------כפתורים LOGIN ן-SIGNIN--------------------------
var modal = document.getElementById("loginModal");
var modal2 = document.getElementById("signinModal");
var btn = document.getElementById("log");
var btn2 = document.getElementById("sign");
var btn3 = document.getElementById("logout");
var span = document.getElementsByClassName("close")[0];
var span2 = document.getElementsByClassName("close2")[0];
let currentUser=localStorage.getItem('currentUser');
currentUser=JSON.parse(currentUser);

btn.onclick = function() {
    modal.style.display = "block";
}
btn2.onclick=function(){
    modal2.style.display = "block";
}


span.onclick = function() {
    modal.style.display = "none";
}

span2.onclick = function() {
    modal2.style.display = "none";
}

document.getElementById("link").onclick = function() {
    modal.style.display = "none";
    modal2.style.display = "block"; 
}
btn3.onclick=function(){
    let currentUser=localStorage.getItem('currentUser');
    localStorage.removeItem('currentUser');
       currentUser=JSON.parse(currentUser);
       
}

// ---------------------------------------------------לוגיקת הכניסה-----------------------------
document.getElementById('enter').onclick = function(event) {
    event.preventDefault(); // מונע את שליחת הטופס
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let users = JSON.parse(localStorage.getItem('users')) || [];
    let existingUser = users.find(user => user.email === email && user.password === password);

    if (existingUser) {
        let title = `ברוך הבא, ${existingUser.name}!`;
        document.getElementById("title").innerText = title; 
        localStorage.setItem('currentUser', JSON.stringify(existingUser)); // שמירה של המשתמש בלוקאל סטורג'

        document.getElementById('loginModal').style.display = "none"; 
        document.getElementById("email").value = ""; 
        document.getElementById("password").value = "";
        createPointsTable();
    } else {
        alert("אימייל או סיסמה לא נכונים");
    }
    
};

//------------------------------------------- לוגיקת ההרשמה
document.getElementById('enter2').onclick = function(event) {
    event.preventDefault(); // מונע את שליחת הטופס
    let name = document.getElementById("nameSign").value;
    let email = document.getElementById("emailSign").value; 
    let password = document.getElementById("passwordSign").value;

    let users = JSON.parse(localStorage.getItem('users')) || [];
    let existingUser = users.find(user => user.email === email);

    if (existingUser) {
        alert("אימייל זה כבר בשימוש");
        
    } else {
        let newUser = {
            name: name,
            email: email,
            password: password,
            game1: "0",
            game2: "0",
            game3: "0",
            game4: "0",
        };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
      
        alert("המשתמש נרשם בהצלחה!");
        let title = "ברוך הבא, " + `${newUser.name}`;
        let h1title=document.createElement('h1');
        h1title.textContent=title;
       
        localStorage.setItem('currentUser', JSON.stringify(newUser)); // שמירה של המשתמש בלוקאל סטורג'
        
        document.getElementById('signinModal').style.display = "none"; 
        // סגירת המודל
        createPointsTable();
    }
};

//------------------------------------------- הצגת CURRENTUSER כאשר הדף נטען-----------------------------
window.onload = function() {
    currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        document.getElementById("title").innerText = `ברוך הבא, ${currentUser.name}!`;
    } else {
        document.getElementById("title").innerText = "ברוך הבא, אנא התחבר";
    }
};


function createPointsTable() {
    // בדיקה אם הטבלה כבר קיימת
    if (document.getElementById('pointsTable')) {
        return; // אם כן, יוצאים מהפונקציה
    }

    currentUser = localStorage.getItem('currentUser');
    currentUser = JSON.parse(currentUser);

    const pointsTableDiv = document.createElement('div');
    pointsTableDiv.id = 'pointsTable';

    const title = document.createElement('h2');
    title.textContent = 'צבירת נקודות שלך';
    pointsTableDiv.appendChild(title);

    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    const headerRow = document.createElement('tr');
    const gameHeader = document.createElement('th');
    gameHeader.textContent = 'משחק';
    const pointsHeader = document.createElement('th');
    pointsHeader.textContent = 'נקודות';
    const playerHeader = document.createElement('th');
    playerHeader.id = 'player';

    headerRow.appendChild(gameHeader);
    headerRow.appendChild(pointsHeader);
    headerRow.appendChild(playerHeader);
    thead.appendChild(headerRow);

    const games = [
        { name: 'משחק זיכרון', pointsId: 'memoryPoints' },
        { name: 'טיק טק טו', pointsId: 'ticTacToePoints' },
        { name: 'שיטה עיוורת', pointsId: 'blindPoints' },
        { name: 'קאנדי קראש', pointsId: 'candyCrushPoints' }
    ];

    // הוספת שורות למשחקים
    games.forEach(game => {
        const row = document.createElement('tr');
        const gameCell = document.createElement('td');
        gameCell.textContent = game.name;

        const pointsCell = document.createElement('td');
        pointsCell.id = game.pointsId;
        pointsCell.textContent = '0';
        row.appendChild(gameCell);
        row.appendChild(pointsCell);
        tbody.appendChild(row);
    });

    // הוספת התוכן לטבלה
    table.appendChild(thead);
    table.appendChild(tbody);
    pointsTableDiv.appendChild(table);

    document.body.appendChild(pointsTableDiv);
    document.getElementById('memoryPoints').textContent = currentUser.game1;
    document.getElementById('ticTacToePoints').textContent = currentUser.game2;
    document.getElementById('blindPoints').textContent = currentUser.game3;
    document.getElementById('candyCrushPoints').textContent = currentUser.game4;
}

window.onload = createPointsTable;


//------------חלונית צדדית------------------------------------------
function openMenu() {
    document.getElementById("sideMenu").style.left = "0"; // פתח את התפריט
}

function closeMenu() {
    document.getElementById("sideMenu").style.left = "-250px"; // סגור את התפריט
}






