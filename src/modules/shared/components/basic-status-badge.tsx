import { BasicStatus } from "../data/schema/shared.schema";
import { sharedTranslations } from "../shared.translations";
import { Badge } from "./ui/badge";

export function BasicStatusBadge({ status }: { status: BasicStatus }) {
	if (status === BasicStatus.Active) {
		return <Badge variant="positive">{sharedTranslations.basicStatus[status]}</Badge>;
	}
	return <Badge variant="negative">{sharedTranslations.basicStatus[status]}</Badge>;
}
