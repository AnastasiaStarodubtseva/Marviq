function buildMachineDisplay(machine) {
  var dom =   '<div class="machine">'
            + '<h2> Machine ' + machine.MACHINE + '</h2>'
            + '<div class="row">'
            + '<div class="four columns">'
            + '<p class="net-production">' + numeral(netProduction(machine.PRODUCTION , machine.SCRAP_PERCENTAGE)).format('0,0') + '</p>'
            + '<p>Net Production</p>'
            + '</div>'

            + '<div class="four columns">'
            + '<p class="percent-scrap">' + machine.SCRAP_PERCENTAGE.toFixed(3) + '</p>'
            + '<p> % of scrap vs gross production</p>'
            + '</div>'

            + '<div class="four columns">'
            + '<p class="machine-downtime">' + machine.DOWNTIME_PERCENTAGE.toFixed(3) + '</p>'
            + '<p> % of downtime for a machine</p>'
            + '</div>'
            + '</div>'

            + '<h3>Hourly net production</h3>'
            + '<table>'
            + '<thead>'
            + '<tr>' + tableHead()
            + '</tr>'
            + '</thead>'
            + '<tbody>'
            + '<tr>' + tableBody(machine)
            + '</tr>'
            + '</tbody>'
            + '</table>'
            + '</div>';

  $('.machines').append(dom);
}

function tableHead() {
  var hours = [];

  for (var i = 0; i < 24; i++) {
    hours.push( '<th>' + zeroPad(i) + ':00</th>' )
  }

  return hours.join('');
}

function zeroPad(n) {
  return n < 10 ? '0' + n : n;
}

function netProduction(gross, scrap) {
  return Math.round(gross - (scrap / 100 * gross));
}

function tableBody(machine) {
  var production = [];

  for (var i = 0; i < 24; i++) {
    production.push('<td>' + machine['H' + i] + '</td>');
  }

  return production.join('');
}

$(function() {
  $.ajax({
    url: "https://gist.githubusercontent.com/AnastasiaStarodubtseva/cb0aebf9f1dde53f0abce095586b7af0/raw/3b32a0c9ff25c362cfed40013fd52bb73789c2aa/machines.json"
  })
  .done(function(data) {

    var machines = JSON.parse(data);

    for (var i = 0; i < machines.length; i++) {
      buildMachineDisplay(machines[i]);
    }

    $.ajax({
      url: "https://gist.githubusercontent.com/AnastasiaStarodubtseva/0fd2aca5a345fa43827905e7490ffdba/raw/9d734b2a6e40b2387f977d01a182f7b1a300283c/machine_statuses.json"
    })
    .done(function(data) {
      var statuses = JSON.parse(data);
      
      console.log(statuses);
      
      for (var key in statuses) {
        if (statuses.hasOwnProperty(key)) {
          console.log(key + "->" + statuses[key]);
          $('.machine:contains("' + key + '")').addClass('status-' + statuses[key].split('/')[0]);
        }
      }
      console.log($(".machine"));
    })

  });
});



