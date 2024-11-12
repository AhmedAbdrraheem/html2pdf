window.function = function (input1, input2, input3) {

	// Function to calculate Jaccard Similarity
function calculateJaccardSimilarity(setA, setB) {
    const intersection = new Set([...setA].filter(x => setB.has(x)));
    const union = new Set([...setA, ...setB]);
    return intersection.size / union.size;
}

// Main function to find similar organizations and return matching IDs
function findSimilarOrganizationIDsJaccard(targetName, organizationsString, matchThreshold) {
    // Set a default threshold value of 0.8 if none is provided
    const threshold = matchThreshold !== undefined ? matchThreshold : 0.8;

    let organizations;

    // Attempt to parse the JSON string, catching errors if JSON is malformed
    try {
        organizations = JSON.parse(organizationsString);
    } catch (error) {
        return "";
    }

    const targetWords = new Set(targetName.toLowerCase().split(/\W+/).filter(Boolean));

    const matchingIDs = organizations
        .map((org) => {
            const orgWords = new Set(org.name.toLowerCase().split(/\W+/).filter(Boolean));
            const similarity = calculateJaccardSimilarity(targetWords, orgWords);
            return { ID: org.ID, similarity };
        })
        .filter(sim => sim.similarity > threshold)
        .map(sim => sim.ID);

    return matchingIDs.join(',');
}

// Example Input with names containing apostrophes
const input1 = "GENERAL ELECTRIC";
const input2String = '[{"name":"GENERAL ELECTRIC","ID":"fPmGLk2qStG7YFHxA97Jdw"}, {"name":"MORAN SHIPPING","ID":"oQvxhUf8R12qsmzs2LH2mg"}, {"name":"NEW ENGLAND FISHERMEN’S STEWARDSHIP ASSOCIATION","ID":"ifwsceFZQcWpqiJZH0M.dA"}, {"name":"NORTON LILLY","ID":"2z.wBbEjT36Vup8YVApW4g"}, {"name":"GOLDEN RAMA","ID":"9B07MZJdQI6uEyqJDn8d3A"}]';

// Run with a custom match threshold
const result = findSimilarOrganizationIDsJaccard(input1, input2String);
return result; // Outputs matching IDs as a comma-separated string

		}
