function MaxValue(m, vector) {
    let answer = m;
    let step = 1;
    for (let i = 0; i < vector.length; i++) {
        if (vector[i] < 0) {
            step++
            continue;
        }
        if (answer >= step) {
            answer = answer - step + vector[i];
            step = 1;
        } else {
            return -1;
        }
    }

    return answer;
}
