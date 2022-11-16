import data from './table_idol.json' assert {type: 'json'};

var indices = createSortIndices(sortNumber, sortString, sortNumber, sortNumber, sortNumber, sortNumber, sortNumber, sortNumber, sortNumber);
var sortCol = 0;
var sortOrd = true;
var idxCurr = indices[sortCol];
var idx     = 0;

for(let item of data)
{
    indices[0].index.push({ index: idx, value: item.id });
    indices[1].index.push({ index: idx, value: item.phon });
    indices[2].index.push({ index: idx, value: item.type_no });
    indices[3].index.push({ index: idx, value: item.num_cards });
    indices[4].index.push({ index: idx, value: item.num_ssr });
    indices[5].index.push({ index: idx, value: item.num_sr });
    indices[6].index.push({ index: idx, value: item.last_v_gacha });
    indices[7].index.push({ index: idx, value: item.last_v_ssr });
    indices[8].index.push({ index: idx, value: item.last_v_event });
    ++idx;
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

    idxCurr=indices[index];
    idxCurr.sorter(idxCurr.index, sortOrd);
    createThisTable();
}

window.clickSort = clickSort;

function createThisTable()
{
    var table   = document.getElementById('table-idol');

    table.innerHTML = '';

    var now     = Date.now() / 1000;
    var thead   = createChildElement(table, 'thead', 'table-idol-thead', 'table-thead');
    var tr      = createChildElement(thead, 'tr');
    var th      = createChildElement(tr, 'th', null, 'table-idol-id');    th.innerText= 'ID';        setAttributes(th, { onclick: 'clickSort(0)', rowspan: 2 });
    th          = createChildElement(tr, 'th', null, 'table-idol-name');  th.innerText= 'Name';      setAttributes(th, { onclick: 'clickSort(1)', rowspan: 2 });
    th          = createChildElement(tr, 'th', null, 'table-idol-type');  th.innerText= 'Type';      setAttributes(th, { onclick: 'clickSort(2)', rowspan: 2 });
    th          = createChildElement(tr, 'th', null, 'table-idol-num');   th.innerText= 'Count';     setAttributes(th, {                          colspan: 3 });
    th          = createChildElement(tr, 'th', null, 'table-idol-date');  th.innerText= 'Implement'; setAttributes(th, {                          colspan: 3 });
    tr          = createChildElement(thead, 'tr');
    th          = createChildElement(tr, 'th', null, 'table-idol-num1');  th.innerText= 'Card';      setAttributes(th, { onclick: 'clickSort(3)' });
    th          = createChildElement(tr, 'th', null, 'table-idol-num2');  th.innerText= 'SSR';       setAttributes(th, { onclick: 'clickSort(4)' });
    th          = createChildElement(tr, 'th', null, 'table-idol-num3');  th.innerText= 'SR';        setAttributes(th, { onclick: 'clickSort(5)' });
    th          = createChildElement(tr, 'th', null, 'table-idol-date1'); th.innerText= 'Gacha';     setAttributes(th, { onclick: 'clickSort(6)' });
    th          = createChildElement(tr, 'th', null, 'table-idol-date2'); th.innerText= 'SSR';       setAttributes(th, { onclick: 'clickSort(7)' });
    th          = createChildElement(tr, 'th', null, 'table-idol-date3'); th.innerText= 'Event';     setAttributes(th, { onclick: 'clickSort(8)' });
    var tbody   = createChildElement(table, 'tbody', 'table-idol-tbody', 'table-tbody');

    for(let item of idxCurr.index.map(i => data[i.index]))
    {
        var day1= (now - item.last_v_gacha) / 86400;
        var day2= (now - item.last_v_ssr)   / 86400;
        var day3= (now - item.last_v_event) / 86400;
        var type= 'type-' + item.type;
        tr      = createChildElement(tbody, 'tr');
        var td  = createChildElement(tr, 'td', null, 'table-idol-id',    type); td.innerText= item.id;
        td      = createChildElement(tr, 'td', null, 'table-idol-name',  type); td.innerText= item.name;
        td      = createChildElement(tr, 'td', null, 'table-idol-type',  type); td.innerText= item.type;
        td      = createChildElement(tr, 'td', null, 'table-idol-num1',  type); td.innerText= item.num_cards;
        td      = createChildElement(tr, 'td', null, 'table-idol-num2',  type); td.innerText= item.num_ssr;
        td      = createChildElement(tr, 'td', null, 'table-idol-num3',  type); td.innerText= item.num_sr;
        td      = createChildElement(tr, 'td', null, 'table-idol-date1', type); td.innerText= item.last_v_gacha == 0 ? "-" : (item.last_gacha + "(" + (day1 <= 0 ? "0" : day1.toFixed(0)) + ")");
        td      = createChildElement(tr, 'td', null, 'table-idol-date2', type); td.innerText= item.last_v_ssr   == 0 ? "-" : (item.last_ssr   + "(" + (day2 <= 0 ? "0" : day2.toFixed(0)) + ")");
        td      = createChildElement(tr, 'td', null, 'table-idol-date3', type); td.innerText= item.last_v_event == 0 ? "-" : (item.last_event + "(" + (day3 <= 0 ? "0" : day3.toFixed(0)) + ")");
    }
}

createThisTable();
