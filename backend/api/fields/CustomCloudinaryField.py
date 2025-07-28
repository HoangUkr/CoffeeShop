from cloudinary.models import CloudinaryField as BaseCloudinaryField

# Custom field to upload file to selected folder.
# Unused due to error when making migration
class CustomCloudinaryField(BaseCloudinaryField):
    def __init__(self, folder_name=None, *args, **kwargs):
        if not folder_name or folder_name.strip() == '':
            raise ValueError("Folder name must be specified for CustomCloudinaryField.")
        self.folder_name = folder_name
        super().__init__(*args, **kwargs)

    # Add deconstruct to prevent re-initiate folder name field
    def deconstruct(self):
        name, path, args, kwargs = super().deconstruct()
        kwargs['folder_name'] = self.folder_name
        return name, path, args, kwargs
    
    def pre_save(self, model_instance, add):
        # Inject folder into options before saving
        self.options = {
            **(self.options or {}),
            'folder': self.folder_name,
            'use_filename': True,
            'unique_filename': False,
            'overwrite': True
        }
        return super().pre_save(model_instance, add)