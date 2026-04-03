"use client";

import { Autocomplete } from "@base-ui/react/autocomplete";
import * as React from "react";

export type AutocompleteRootProps = React.ComponentPropsWithoutRef<typeof Autocomplete.Root>;
export const AutocompleteRoot = (props: AutocompleteRootProps) => <Autocomplete.Root {...props} />;
AutocompleteRoot.displayName = "AutocompleteRoot";

export const AutocompleteValue = Autocomplete.Value;
