import { fetchTargetTasks, updateTaskStatus } from "./notion.js";

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function updateAllTasksStatus(fetchFuntion, updateOneFunction, sleepTime, nextCursor = undefined) {
    const pageResponse = await fetchFuntion(nextCursor)
    console.log("Called fetch function.")
    if (pageResponse.results.length == 0) {
        return
    }
    await pageResponse.results.forEach(async (page) => {
        await sleep(sleepTime)
        const response = await updateOneFunction(page.id)
    });
    console.log("Called update functions.")
    await sleep(sleepTime)
    await updateAllTasksStatus(fetchFuntion, updateOneFunction, sleepTime, pageResponse.next_cursor);
}

const main = async () => {
    await updateAllTasksStatus(fetchTargetTasks, updateTaskStatus, 1000)
}

await main();