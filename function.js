window.function = function (input1, input2, input3) {
    const targetName = input1.value;  // Assuming input1 contains the organizations JSON
    const organizationsString = input2.value;  // Assuming input2 contains the target name
    const matchThreshold = input3.value;  // Assuming input3 contains the threshold value
    let organizations;

    // Attempt to parse the JSON string, catching errors if JSON is malformed
    try {
        organizations = JSON.parse(organizationsString);
    } catch (error) {
        return "Invalid JSON format";
    }

    // Prepare target words as a set
    const targetWords = new Set(targetName.toLowerCase().split(/\W+/).filter(Boolean));

    // Find matching organizations based on Jaccard similarity
    const matchingIDs = organizations
        .map((org) => {
            const orgWords = new Set(org.name.toLowerCase().split(/\W+/).filter(Boolean));

            // Calculate Jaccard similarity without a separate function
            const intersection = new Set([...targetWords].filter(x => orgWords.has(x)));
            const union = new Set([...targetWords, ...orgWords]);
            const similarity = intersection.size / union.size;

            return { ID: org.ID, similarity };
        })
        .filter(sim => sim.similarity > matchThreshold)
        .map(sim => sim.ID);

    // Return matching IDs as a comma-separated string
    return matchingIDs.join(',');
};
