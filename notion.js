
import { Client } from "@notionhq/client"

const notion = new Client({
    auth: process.env.NOTION_API_KEY
})

const databaseId = process.env.NOTION_DATABASE_ID
const completedPropertyString = "完了"
const statusPropertyString = "ステータス"
const completdStatusString = "DONE"

export const fetchTargetTasks = async (startCursor) => {
    const response = await notion.databases.query({
        database_id: databaseId,
        start_cursor: startCursor,
        filter: {
            "and": [
                {
                    property: completedPropertyString,
                    checkbox: {
                        equals: true
                    }
                },
                {
                    property: statusPropertyString,
                    status: {
                        "does_not_equal": completdStatusString
                    }
                }
            ]
        },
    });
    return response;
}

export const updateTaskStatus = async (pageId) => {
    const response = await notion.pages.update({
        page_id: pageId,
        properties: {
            [statusPropertyString]: {
                "status": {
                    "name": completdStatusString
                }
            },
            [completedPropertyString]: {
                "checkbox": false
            }
        }
    })
    return response;
}