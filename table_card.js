var sortCol     = 0;
var sortOrd     = true;
var sorters     = null;
var tableData   = null;

function initCardsTable(data)
{
    tableData   = data;
    sorters     = createSorters(
        [item => item.id,          compareNumber],
        [item => item.name,        compareString],
        [item => item.rarity,      compareString],
        [item => item.implement_v, compareNumber],
        [item => item.reward,      compareString],
        [item => item.max_vo,      compareNumber],
        [item => item.max_da,      compareNumber],
        [item => item.max_vi,      compareNumber]);

    createTable(tableData);
}

function createTable(data)
{
    var table   = document.getElementById('table-card');

    table.innerHTML = '';

    var now     = Date.now() / 1000;
    var thead   = createChildElement(table, 'thead', 'table-card-thead', 'table-thead');
    var tr      = createChildElement(thead, 'tr');
    var th      = createChildElement(tr, 'th', null, 'table-card-id');     th.innerText= 'ID';          setAttributes(th, { onclick: 'clickSort(0)' });
    th          = createChildElement(tr, 'th', null, 'table-card-name');   th.innerText= 'Name';        setAttributes(th, { onclick: 'clickSort(1)' });
    th          = createChildElement(tr, 'th', null, 'table-card-rarity'); th.innerText= 'Rarity';      setAttributes(th, { onclick: 'clickSort(2)' });
    th          = createChildElement(tr, 'th', null, 'table-card-date');   th.innerText= 'Implement';   setAttributes(th, { onclick: 'clickSort(3)' });
    th          = createChildElement(tr, 'th', null, 'table-card-reward'); th.innerText= 'Reward';      setAttributes(th, { onclick: 'clickSort(4)' });
    th          = createChildElement(tr, 'th', null, 'table-card-label');  th.innerText= 'Event/Gacha'; setAttributes(th, { onclick: 'clickSort(4)' });
    th          = createChildElement(tr, 'th', null, 'table-card-num');    th.innerText= 'Vo';          setAttributes(th, { onclick: 'clickSort(5)' });
    th          = createChildElement(tr, 'th', null, 'table-card-num');    th.innerText= 'Da';          setAttributes(th, { onclick: 'clickSort(6)' });
    th          = createChildElement(tr, 'th', null, 'table-card-num');    th.innerText= 'Vi';          setAttributes(th, { onclick: 'clickSort(7)' });
    var tbody   = createChildElement(table, 'tbody', 'table-card-tbody', 'table-tbody');

    for(let item of tableData)
    {
        var day = (now - item.implement_v) / 86400;
        tr      = createChildElement(tbody, 'tr');
        var td  = createChildElement(tr, 'td', null, 'table-card-id');     td.innerText= item.id;
        td      = createChildElement(tr, 'td', null, 'table-card-name');   td.innerText= item.name;
        td      = createChildElement(tr, 'td', null, 'table-card-rarity'); td.innerText= item.rarity;
        td      = createChildElement(tr, 'td', null, 'table-card-date');   td.innerText= item.implement == 0 ? "-" : (item.implement + "(" + (day <= 0 ? "0" : day.toFixed(0)) + ")");
        td      = createChildElement(tr, 'td', null, 'table-card-reward'); td.innerText= item.reward;
        td      = createChildElement(tr, 'td', null, 'table-card-label');  td.innerText= item.label;
        td      = createChildElement(tr, 'td', null, 'table-card-num');    td.innerText= item.max_vo;
        td      = createChildElement(tr, 'td', null, 'table-card-num');    td.innerText= item.max_da;
        td      = createChildElement(tr, 'td', null, 'table-card-num');    td.innerText= item.max_vi;
    }
}

function clickSort(index)
{
    if(index == sortCol)
        sortOrd = !sortOrd;
    else
    {
        sortCol = index;
        sortOrd = true;
    }

    sortTable(tableData, sorters[sortCol], sortOrd);
    createTable(tableData);
}

window.clickSort        = clickSort;
window.initCardsTable   = initCardsTable;
