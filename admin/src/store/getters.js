export default {
    toolType (state) {
        return [...new Set(state.tools.map(e => e.tool_type))]
    }
}