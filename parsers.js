async function parse() {
    let table = document.getElementsByClassName("listtable result-table")[0],
        tableRows = table.getElementsByTagName("tr");

    let orders = [],
        num = 0;
    for (let row of tableRows) {
        num++;
        if (num <= 2) continue;

        try {
            let order = row.getElementsByTagName("td")[3],
                pacientFullName = row.getElementsByTagName("td")[7];
            orders[orders.length - 1] = order.innerText;

            console.log(pacientFullName.innerText);

            let url = "/OrderPrint_Pdf.php?OrderIDDetail=" + order.innerText,
                response = await fetch(url);

            if (response.ok) {
                let blob = await response.blob(),
                    pdfUrl = URL.createObjectURL(blob),
                    a = document.createElement("a");

                a.href = pdfUrl;
                a.download = `${order.innerText} ${pacientFullName.innerText
                    .replaceAll(",", "")
                    .replaceAll(" ", "-")}.pdf`;
                document.body.appendChild(a);
                a.click();
            } else {
                console.log(response.status);
            }
        } catch (err) {
            console.error(err);
        }
    }
}
await parse();
