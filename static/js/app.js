var path = "samples.json";

const dataPromise = d3.json(path);
console.log("Data Promise: ", dataPromise);


var belly_data = dataPromise.then(function(data) {
    console.log("json: ", data);
    let names =  data.names;
    const def = names[0];
    console.log("names: ", names);
    var options = d3.select("#selDataset").append("option");
    options.text(def);
    for (let i = 0; i < data.samples.length; i++) {
      if (data.samples[i].id === def) {
        console.log(data.samples[i]);
      }
    }

    meta(data, def);
    horchart(data, def);
    bubble(data, def)
  })

function meta(data, id) {
  var metadata = d3.select("#sample-metadata");
  var metalist = metadata.append("ul")
  for (let i = 0; i < data.samples.length; i++) {
    if (data.samples[i].id === id) {
      metalist.append("li").text(`id: ${data.metadata[i].id}`);
      metalist.append("li").text(`age: ${data.metadata[i].age}`);
      metalist.append("li").text(`bbtype: ${data.metadata[i].bbtype}`);
      metalist.append("li").text(`ethnicity: ${data.metadata[i].ethnicity}`);
      metalist.append("li").text(`gender: ${data.metadata[i].gender}`);
      metalist.append("li").text(`location: ${data.metadata[i].location}`);
      metalist.append("li").text(`wfreq: ${data.metadata[i].wfreq}`);
    }
  }
}

function horchart(data, id) {
  for (let i = 0; i < data.samples.length; i++) {
    if (data.samples[i].id === id) {
      var string_id = id_string(data.samples[i])
      var dataset = [{
        type: 'bar',
        x: data.samples[i].sample_values.slice(0, 10).reverse(),
        y: string_id.slice(0,10).reverse(),
        orientation: "h",
        text: data.samples[i].otu_labels.slice(0, 10).reverse()
      }];

      Plotly.newPlot('bar', dataset);
      }
    }

}

function bubble(data, id) {
  for (let i = 0; i < data.samples.length; i++) {
    if (data.samples[i].id === id) {
      var dataset = [{
        x: data.samples[i].otu_ids,
        y: data.samples[i].sample_values,
        mode: 'markers',
        marker: {
          size: data.samples[i].sample_values,
          color: data.samples[i].otu_ids,
          colorscale: [[0, 'rgb(204, 255, 204)'], [1, 'rgb(0, 0, 204)']]
        },
        text: data.samples[i].otu_labels
      }]

      Plotly.newPlot('bubble', dataset);
    }
  }
}

function id_string(id_list) {
  var string_id = []
      for (let j = 0; j< id_list.otu_ids.length; j++) {
        string_id.push(`OTU ${id_list.otu_ids[j]}`);
      }
  return string_id;
}