function get_cookie() {
    let cookie = document.cookie;
    let cookie_array = cookie.split(';');
    cookie_array.forEach(function (cookie_value) {
        let cookie_value_array = cookie_value.split('=');
        if (cookie_value_array[0].trim() === 'TEAM') {
            document.querySelector('.side-input-section .team-input').value = decodeURIComponent(cookie_value_array[1].trim());
            update_line_count();
        }
    });
}
function save_cookie(textarea_value) {
    let date = new Date();
    date.setTime(date.getTime() + (30*24*60*60*1000));
    let expires = "expires=" + date.toUTCString();
    document.cookie = `TEAM=${encodeURIComponent(textarea_value)}; ${expires}; path=/;`;
}
function create_a_random_team() {
    let textarea_value = document.querySelector('.side-input-section .team-input').value;
    if (textarea_value !== '') {
        save_cookie(textarea_value);
    }
    let user_array = textarea_value_sparation(textarea_value);
    let mixed_user_array = array_mixer(user_array);
    table_setting(mixed_user_array);
}
function textarea_value_sparation(textarea_value) {
    return textarea_value.split("\n");
}
function array_mixer(user_array) {
    for (let i = user_array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [user_array[i], user_array[j]] = [user_array[j], user_array[i]];
    }
    return user_array;
}
function table_setting(user_array) {
    let team1_cells = document.querySelectorAll('td.team-1');
    let team2_cells = document.querySelectorAll('td.team-2');
    team1_cells.forEach(function (team1_cell) {team1_cell.innerHTML = ''});
    team2_cells.forEach(function (team2_cell) {team2_cell.innerHTML = ''});

    user_array.slice(0, 5).forEach((value, index) => {
        team1_cells[index].textContent = value;
    });

    user_array.slice(5).forEach((value, index) => {
        team2_cells[index].textContent = value;
    });
}
function update_line_count() {
    let textarea = document.querySelector('.team-input');
    let textarea_value = textarea.value;
    let users = textarea_value.split('\n').filter(user => user.trim() !== '');
    let user_count = users.length;
    document.querySelector('.user-count').textContent = `(${user_count}/10)`;
}
function limit_lines(event) {
    let textarea = document.querySelector('.team-input');
    let textarea_value = textarea.value;
    let lines = textarea_value.split('\n');
    if (event.key === 'Enter' && (lines.length >= 10 || lines.some(line => line.trim() === ''))) {
        event.preventDefault();
    }
}