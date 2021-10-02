let input = document.querySelector('input');
//let textarea = document.querySelector('textarea');
let lines = [];
let line = -5;
let data = [];

function updateData() {
  line += 5;
  var string = lines[line].split(" ");
  data = [string[5], string[6], string[7]];
}

function getX() {
  return data[0];
}
function getY() {
  return data[1];
}
function getZ() {
  return data[2];
}


input.addEventListener('change', () => {
    let files = input.files;
    if(files.length == 0) return;
    const file = files[0];
    let reader = new FileReader();
    reader.onload = (e) => {
        const file = e.target.result;
        lines = file.split(/\r\n|\n/);

        updateData();
        Plotly.newPlot('all',[{
               y:[getX()],
               type:'line',
               name:'X acceleration',
               line: {
                 color: 'rgb(255, 0, 0)',
                 width:1
               }
        }, {
              y:[getY()],
              type:'line',
              name:'Y acceleration',
              line: {
                color: 'rgb(0, 255, 0)',
                width:1
              }
        }, {
              y:[getZ()],
              type:'line',
              name:'Z acceleration',
              line: {
                color: 'rgb(0, 0, 255)',
                width:1
              }
        }], {
              title:'Acceleration vs. Time',
              xaxis: {
                title:'Time'
              },
              yaxis: {
                title:'Meters/Seconds^2'
              }
        });

        setInterval(function() {
           updateData();
           Plotly.extendTraces('all', { y: [[getX()],[getY()],[getZ()]]}, [0, 1, 2])
        }, 2);
    };
    reader.onerror = (e) => alert(e.target.error.name);
    reader.readAsText(file);

});
