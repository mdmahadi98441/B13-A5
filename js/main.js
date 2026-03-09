
let allIssues = []

const modal = document.getElementById("issue-model")
const closeModel = document.getElementById("close-model")

const loadIssues = () => {
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then(res => res.json())
        .then(data => {
            allIssues = data.data 
            displayissues(allIssues)
        })
        
}

const displayissues = (issues) => {

    const issueContainer = document.getElementById("issues-conteiner")
    issueContainer.innerHTML = ""

document.getElementById("issue-count-text").innerText = `${issues.length} Issues`
  issues.forEach((issue, index) => {

        const newdiv = document.createElement("div")
        newdiv.classList.add("newdiv")
const iconPath = issue.status === "open"
            ?"B13-A5-Github-Issue-Tracker/assets/Open-Status.png"
            :"B13-A5-Github-Issue-Tracker/assets/Closed- Status .png"

        newdiv.innerHTML = `
           <div class="card-header">
                <div class="status-icon-wrap">
                    <img src="${iconPath}" alt="" class="status-icon">
                </div>

                <span class="priority">${issue.priority}</span>
           </div>
           
           <h3 class="issue-title">${issue.title}</h3>
           
           <p class="issue-description">
           ${issue.description}</p>
           
           <div class="labels">
              <span class="label bug-fill">
                BUG
              </span>

              <span class="label help-fill">
                HELP WANTED
              </span>
           </div>
           
        <div class="card-footer">
              <span class="author">#${index + 1} by ${issue.author}</span>
              <span class="date">${issue.createdAt}</span>
           </div>
        `

        if (issue.status === "open") {
            newdiv.classList.add("open")
        } else {
            newdiv.classList.add("closed")
        }

        newdiv.addEventListener("click", () => {

            modal.style.display = "flex"

            document.getElementById("model-title").innerText = issue.title
            document.getElementById("model-des").innerText = issue.description
            document.getElementById("model-status-badge").innerText =
                issue.status === "open" ? "Opened" : "Closed"

            document.getElementById("model-author").innerText = "Opened by " + issue.author
            document.getElementById("model-date").innerText = issue.createdAt
            document.getElementById("model-assignee").innerText = issue.author

            const priorityElement = document.getElementById("model-priority")
            priorityElement.innerText = issue.priority

            priorityElement.classList.remove("high-priority", "medium-priority", "low-priority")

            const priority = issue.priority.toLowerCase()

            if (priority === "high") {
                priorityElement.classList.add("high-priority")
            } else if (priority === "medium") {
                priorityElement.classList.add("medium-priority")
            } else {
                priorityElement.classList.add("low-priority")
            }
        })

        issueContainer.append(newdiv)
    })
}

loadIssues()

document.getElementById("all-btn").addEventListener("click", () => {
    displayissues(allIssues)
})

document.getElementById("open-btn").addEventListener("click", () => {
    const openIssues = allIssues.filter(issue => issue.status === "open")
    displayissues(openIssues)
})

document.getElementById("close-btn").addEventListener("click", () => {
    const closedIssues = allIssues.filter(issue => issue.status === "closed")
    displayissues(closedIssues)
})

closeModel.addEventListener("click", () => {
    modal.style.display = "none"
})

const btns = document.querySelectorAll(".btn")

btns.forEach(btn => {
    btn.addEventListener("click", function () {
        btns.forEach(bt => bt.classList.remove("active"))
        this.classList.add("active")
    })
})