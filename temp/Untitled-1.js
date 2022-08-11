function output(num) {
    if (num < 1) return [];

    let ansArr = [];

    let ans = '(';
    add(ans, 1, 0);

    function add(str, leftNum, rightNum) {
        if (rightNum === num) {
            ansArr.push(str);
            return;
        }
        if (leftNum >= num) {
            add(str + ')', leftNum, rightNum + 1);
        } else {
            add(str + '(', leftNum + 1, rightNum);
            if (leftNum > rightNum) {
                add(str + ')', leftNum, rightNum + 1);
            }
        }
    }

    return ansArr;
}
