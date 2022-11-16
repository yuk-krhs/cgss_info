import data from './stats_sky.json' assert {type: 'json'};

var indices = createSortIndices(sortNumber, sortNumber, sortString, sortRank, sortRank);
var sortCol = 3;
var sortOrd = true;
var idxCurr = indices[sortCol];
var idx     = 0;

for(let item of data)
{
    indices[0].index.push({ index: idx, value: item.no });
    indices[1].index.push({ index: idx, value: item.id });
    indices[2].index.push({ index: idx, value: item.phon });
    indices[3].index.push({ index: idx, value: [item.rank1, item.rank2] });
    indices[4].index.push({ index: idx, value: [item.rank2, item.rank1] });
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
    var table   = document.getElementById('stats-idol');

    table.innerHTML = '';

    var thead   = createChildElement(table, 'thead', 'stats-idol-thead', 'stats-thead');
    var tr      = createChildElement(thead, 'tr');
    var th      = createChildElement(tr, 'th', null, 'stats-idol-no');    th.innerText= '#';      setAttributes(th, { onclick: 'clickSort(0)', rowspan: 2 });
    th          = createChildElement(tr, 'th', null, 'stats-idol-id');    th.innerText= 'ID';     setAttributes(th, { onclick: 'clickSort(1)', rowspan: 2 });
    th          = createChildElement(tr, 'th', null, 'stats-idol-name');  th.innerText= 'Name';   setAttributes(th, { onclick: 'clickSort(2)', rowspan: 2 });
    th          = createChildElement(tr, 'th', null, 'stats-idol-leader');th.innerText= 'Leader'; setAttributes(th, { onclick: 'clickSort(3)', colspan: 3 });
    th          = createChildElement(tr, 'th', null, 'stats-idol-emblem');th.innerText= 'Emblem'; setAttributes(th, { onclick: 'clickSort(4)', colspan: 3 });
    tr          = createChildElement(thead, 'tr');
    th          = createChildElement(tr, 'th', null, 'stats-idol-rank');  th.innerText= 'Rank';   setAttributes(th, { onclick: 'clickSort(3)' });
    th          = createChildElement(tr, 'th', null, 'stats-num-label');  th.innerText= 'Count';  setAttributes(th, { onclick: 'clickSort(3)' });
    th          = createChildElement(tr, 'th', null, 'stats-per-label');  th.innerText= 'Ratio';  setAttributes(th, { onclick: 'clickSort(3)' });
    th          = createChildElement(tr, 'th', null, 'stats-idol-rank');  th.innerText= 'Rank';   setAttributes(th, { onclick: 'clickSort(4)' });
    th          = createChildElement(tr, 'th', null, 'stats-num-label');  th.innerText= 'Count';  setAttributes(th, { onclick: 'clickSort(4)' });
    th          = createChildElement(tr, 'th', null, 'stats-per-label');  th.innerText= 'Ratio';  setAttributes(th, { onclick: 'clickSort(4)' });
    var tbody   = createChildElement(table, 'tbody', 'stats-idol-tbody', 'stats-tbody');
    var last_r1 = null;
    var last_r2 = null;
    var last_td1= null;
    var last_td2= null;
    var rows1   = 1;
    var rows2   = 1;

    for(let item of idxCurr.index.map(i => data[i.index]))
    {
        var type= 'type-' + item.type;
        tr      = createChildElement(tbody, 'tr');
        var td  = createChildElement(tr, 'td', null, 'stats-idol-no');          td.innerText= item.no;
        td      = createChildElement(tr, 'td', null, 'stats-idol-id',    type); td.innerText= item.id;
        td      = createChildElement(tr, 'td', null, 'stats-idol-name',  type); td.innerText= item.name;

        if(last_r1 != item.rank1)
        {
            if(last_td1 && rows1 >= 2) for(let i of last_td1) i.setAttribute('rowspan', rows1);

            rows1   = 1;
            last_td1= [];
            last_td1.push(td= createChildElement(tr, 'td', null, 'stats-idol-rank')); td.innerText= item.rank1;
            last_td1.push(td= createChildElement(tr, 'td', null, 'stats-idol-num'));  td.innerText= item.count1;
            last_td1.push(td= createChildElement(tr, 'td', null, 'stats-idol-per'));  td.innerText= item.per1.toFixed(2)+'%';
        } else
            ++rows1;

        if(last_r2 != item.rank2)
        {
            if(last_td2 && rows2 >= 2) for(let i of last_td2) i.setAttribute('rowspan', rows2);

            rows2   = 1;
            last_td2= [];
            last_td2.push(td= createChildElement(tr, 'td', null, 'stats-idol-rank')); td.innerText= item.rank2;
            last_td2.push(td= createChildElement(tr, 'td', null, 'stats-idol-num'));  td.innerText= item.count2;
            last_td2.push(td= createChildElement(tr, 'td', null, 'stats-idol-per'));  td.innerText= item.per2.toFixed(2)+'%';
        } else
            ++rows2;

        last_r1 = item.rank1;
        last_r2 = item.rank2;
    }

    if(last_td1 && rows1 >= 2) for(let i of last_td1) i.setAttribute('rowspan', rows1);
    if(last_td2 && rows2 >= 2) for(let i of last_td2) i.setAttribute('rowspan', rows2);
}

createThisTable();
