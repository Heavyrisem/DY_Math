const horizontal = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

let result = [];

let tmp = 0;
for(let i = 1; i <= 9.9; i = (i*10 + 0.1*10) / 10) {
    result[tmp] = [];
    result[tmp][0] = i;
    tmp++;
}


result.forEach((value,index) => {
    horizontal.forEach((val,idx) => {
        value[idx+1] = Math.log10(value[0] + '' + val).toFixed(4);
    })
})