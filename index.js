const mongoose = require("mongoose");
const fs = require('fs')
const neatCsv = require('neat-csv')
var data = [];


mongoose.connect("mongodb://localhost:27017/fixturesDB");

const fixtureSchema = new mongoose.Schema({
  round:Number,
  date: String,
  stadium: String,
  home: String,
  away: String,
  result: String
});

const Fixture = mongoose.model("Fixture",fixtureSchema);

function getObject(data){
  const fix = new Fixture({
    round : data["Round"],
    date : data["Date"],
    stadium : data["Location"],
    home : data["Home"],
    away : data["Away"],
    result : data["Result"]

  });
  fix.save();
}

function insert(data){
  dataArr = [];
  data.forEach((item,i) => {
    let obj = getObject(item);
  dataArr.push(obj);

  });
 //dataArr.save();

}


fs.readFile('./fixtures.csv',async (err,data) => {
  if(err){
    console.error(err)
    return
  }
  data = await neatCsv(data);
  insert(data);
})
