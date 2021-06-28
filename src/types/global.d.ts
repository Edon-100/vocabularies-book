interface Window {
	utools: UToolsApi
  services: {
		add_vocabulary: () => Promise<boolean>;
		WordsDB: {
			addMaterialObj: () => void;
			setMaterials: () => void;
			deleteMaterialObj: (text:string) => Promise<DbReturn>
		}
	};
}