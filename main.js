const daysGR = ["Κυριακή", "Δευτέρα", "Τρίτη", "Τετάρτη", "Πέμπτη", "Παρασκευή", "Σάββατο"]
const monthsGR = ["Ιανουαρίου", "Φεβρουαρίου", "Μαρτίου", "Απριλίου", "Μαΐου", "Ιουνίου", "Ιουλίου", "Αυγoύστου", "Σεπτεμβρίου", "Οκτωμβρίου", "Νοεμβρίου", "Δεκεμβρίου"]

let notes = []
let count = 0

$(function() {

  setInterval(printGRDate, 1000)

  $("#addNoteBtn").on("click", function(){
    onInsertHandler({ key: count + 1, note: $("#inputNote").val().trim(), softDeleted: false })
  });

  $("#inputNote").on("keyup", function(e) {
    if (e.key === "Enter") {
      onInsertHandler({ key: count + 1, note: e.target.value.trim(), softDeleted: false })
    }
  })
})

function printGRDate() {
  const today = new Date();
  const month = today.getMonth();
  const day = today.getDay();
  const year = today.getFullYear();
  const hour = today.getHours();
  const minute = today.getMinutes();
  const seconds = today.getSeconds();

  const outputDate = `${daysGR[day]} ,  ${today.getDate()} ${monthsGR[month]} ${year}`
  const outputHour = `${(hour < 10) ? '0': ''}${hour}:${(minute < 10) ? '0': ''}${minute}:${(seconds < 10) ? '0': ''}${seconds}`
  $("#dateTxt").html(`${outputDate} <br> ${outputHour}`) 
}

/**
 * Controller in MVC
 * @param {Object} data 
 * @returns nothing if data.note is empty or null
 */
function onInsertHandler(data) {
  if (!data.note) return
  insertNote(data)
  reset()
}

/**
 * Model function, inserts a new note
 * @param {*} note 
 */
function insertNote(note) {
  notes = [...notes, note]
  count++
  renderNotes()
}

/*
* View rendering
*/
function renderNotes() {
  const $container = $("#notesWrapper")

  $container.html(notes.map((note) => `<div id="${'noteTemplate' + note.key}" class="flex justify-between items-center px-[10px] py-[2px] border-b border-black">
    <div id="${'noteInfo' + note.key}" class="flex items-center">
      <input type="checkbox" id="${'noteCheck' + note.key}" onclick="strikeThrough(${note.key})" class="w-[25px] h-[25px] mr-[5px]" ${note.softDeleted ? 'checked' : ''}>
      <label id="${'noteTxt' + note.key}" for="${'noteCheck' + note.key}" class="w-[200px] max-h-[150px] leading-[1.2rem] overflow-hidden break-words whitespace-normal text-base ${note.softDeleted ? 'line-through text-gray-500' : ''}">${note.note}</label>
    </div>
    <button type="button" id="${'noteDelBtn' + note.key}" class="w-[35px] h-[35px]" onclick="deleteNote(${note.key})">X</button>
  </div>`).join(""))
}

/*
 * Model functions
 */
function strikeThrough(key) {
  notes = notes.map(note =>
    note.key === key ? {...note, softDeleted : !note.softDeleted} : {...note}
  )
  renderNotes()
}

function deleteNote(key) {
  notes = notes.filter(note => note.key !== key)
  renderNotes()
}

/**
 * View function
 */
function reset() {
  $("#inputNote").val("")
}