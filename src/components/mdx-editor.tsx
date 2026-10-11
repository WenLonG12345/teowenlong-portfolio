"use client";

import "@mdxeditor/editor/style.css";
import {
	BlockTypeSelect,
	BoldItalicUnderlineToggles,
	CodeToggle,
	headingsPlugin,
	InsertImage,
	InsertTable,
	InsertThematicBreak,
	imagePlugin,
	ListsToggle,
	listsPlugin,
	MDXEditor,
	type MDXEditorMethods,
	type MDXEditorProps,
	markdownShortcutPlugin,
	quotePlugin,
	tablePlugin,
	thematicBreakPlugin,
	toolbarPlugin,
	UndoRedo,
} from "@mdxeditor/editor";

type EditorProps = {
	markdown: string;
	editorRef?: React.MutableRefObject<MDXEditorMethods | null>;
	onChange?: (markdown: string) => void;
} & MDXEditorProps;
/**
 * Extend this Component further with the necessary plugins or props you need.
 * proxying the ref is necessary. Next.js dynamically imported components don't support refs.
 */
const Editor: React.FC<EditorProps> = ({
	markdown,
	editorRef,
	onChange,
	...rest
}) => {
	return (
		<MDXEditor
			className="text-black bg-card dark:text-white"
			onChange={onChange}
			ref={editorRef}
			markdown={markdown}
			plugins={[
				headingsPlugin(),
				listsPlugin(),
				quotePlugin(),
				thematicBreakPlugin(),
				markdownShortcutPlugin(),
				tablePlugin(),
				imagePlugin(),
				toolbarPlugin({
					toolbarClassName: "my-classname",
					toolbarContents: () => (
						<>
							<UndoRedo />
							<BoldItalicUnderlineToggles />
							<BlockTypeSelect />
							<CodeToggle />
							<ListsToggle />
							<InsertThematicBreak />
							<InsertTable />
							<InsertImage />
						</>
					),
				}),
			]}
			{...rest}
		/>
	);
};

export default Editor;
